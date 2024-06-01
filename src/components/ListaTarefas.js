import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { pessoaAPI } from '../services';
import { Card, CardContent, CardActions, Button, Typography, TextField, Box, Select, MenuItem, FormControl, InputLabel, IconButton, Tooltip, Checkbox, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { formEdicaoSchema } from '../validation/formEdicaoSchema';
 

function ListaTarefas({ id, tarefa, handleExcluir, handleEditar }) { 
  const [editando, setEditando] = useState(false);
  const [pessoas, setPessoas] = useState([]); 
  const [pessoaResponsavel, setPessoaResponsavel] = useState(); 
  const [formInitialized, setFormInitialized] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm({
    resolver: yupResolver(formEdicaoSchema), 
    defaultValues: {
      ehConcluida: false
    },
  });

  useEffect(() => {
    async function carregarDados() { 
        const pessoasData = await pessoaAPI.buscarPessoas(); 
        setPessoaResponsavel(pessoasData?.find(pessoa => pessoa.id === tarefa.pessoaId));
        setPessoas(pessoasData);  
    }

    carregarDados();
  }, []);

  useEffect(() => {
    if (tarefa && !formInitialized) {
      setValue('titulo', tarefa.titulo);
      setValue('descricao', tarefa.descricao);
      setValue('dataPrazoLimite', tarefa.dataPrazoLimite ? new Date(tarefa.dataPrazoLimite).toISOString().split('T')[0] : '');
      setValue('pessoaId', tarefa.pessoaId);
      setValue('ehConcluida', tarefa.ehConcluida);
      setFormInitialized(true);
    }
  }, [tarefa, formInitialized, setValue]);

  const lidarComExclusao = async () => {
    await handleExcluir(tarefa.id);
  };

  const lidarComEdicao = async (data) => {
    const tarefaAtualizada = {
      ...tarefa,
      ...data,
      dataAtualizacao: new Date().toISOString()
    };  
    await handleEditar(tarefa.id, tarefaAtualizada);
    setPessoaResponsavel(pessoas?.find(pessoa => pessoa.id === tarefaAtualizada.pessoaId));
    setValue('titulo', tarefaAtualizada.titulo);
    setValue('descricao', tarefaAtualizada.descricao);
    setValue('dataPrazoLimite', tarefaAtualizada.dataPrazoLimite ? new Date(tarefaAtualizada.dataPrazoLimite).toISOString().split('T')[0] : '');
    setValue('pessoaId', tarefaAtualizada.pessoaId);
    setValue('ehConcluida', tarefaAtualizada.ehConcluida);
    setEditando(false); 
  };

  const isOverdue = tarefa && new Date(tarefa.dataPrazoLimite) < new Date();

  return (
    <Card key={id} sx={{ height: editando ? 'fit-content' : 250 , mb: 2, borderRadius: 2, boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 }, borderColor: isOverdue ? 'error.main' : 'primary.main' }}>
      {editando ? (
        <CardContent component="form" onSubmit={handleSubmit(lidarComEdicao)} sx={{ p: 3 }}>
          <TextField
            label="Título"
            fullWidth
            margin="normal"
            {...register('titulo')}
            error={!!errors.titulo}
            helperText={errors.titulo?.message}
          />
          <TextField
            label="Descrição"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            {...register('descricao')}
            error={!!errors.descricao}
            helperText={errors.descricao?.message}
          />
          <TextField
            label="Prazo"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register('dataPrazoLimite')}
            error={!!errors.dataPrazoLimite}
            helperText={errors.dataPrazoLimite?.message}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Pessoa Responsável</InputLabel>
            <Select
              {...register('pessoaId')}
              error={!!errors.pessoaId}
              defaultValue={tarefa.pessoaId}
            >
              <MenuItem value=""><em>Selecione uma Pessoa</em></MenuItem> 
              {pessoas.map((pessoa) => (
                <MenuItem key={pessoa.id} value={pessoa.id}>
                  {pessoa.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>  
          <Controller
            control={control}
            name="ehConcluida"
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                label="Concluída"
              />
            )}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
              Salvar
            </Button>
            <Button variant="outlined" onClick={() => setEditando(false)} startIcon={<CancelIcon />}>
              Cancelar
            </Button>
          </Box>
      </CardContent>
      
      ) : (
        <CardContent sx={{ p: 3, backgroundColor: isOverdue ? 'rgba(244, 67, 54, 0.1)' : 'inherit' }}>
          <Typography variant="h6" component="div" gutterBottom sx={{ color: isOverdue ? 'error.main' : 'text.primary' }}>
            {tarefa.titulo}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {tarefa.descricao}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Prazo: {tarefa.dataPrazoLimite ? new Date(tarefa.dataPrazoLimite).toLocaleDateString() : 'Sem prazo'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Pessoa Responsável: {tarefa.pessoaId && pessoaResponsavel ? `${pessoaResponsavel.nome}` : 'Nenhuma'}
          </Typography> 
          {tarefa.ehConcluida && (
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              Concluída
            </Typography>
          )}
        </CardContent>

      )}
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => setEditando(true)} color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Excluir">
          <IconButton onClick={lidarComExclusao} color="secondary">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default ListaTarefas;
