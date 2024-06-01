import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { pessoaAPI } from '../services';
import { Modal, Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Paper, IconButton, Fab, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { formCadastroSchema } from '../validation/formCadastroSchema';

 
function FormularioTarefaModal({ handleCriarTarefa }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [pessoas, setPessoas] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(formCadastroSchema)
  });

  useEffect(() => {
    const carregarPessoas = async () => {
      const pessoasData = await pessoaAPI.buscarPessoas();
      setPessoas(pessoasData);
    };
    carregarPessoas();
  }, []);

  const lidarComEnvio = async (data) => {
    const novaTarefa = {
      titulo: data.titulo,
      descricao: data.descricao,
      dataPrazoLimite: data.dataPrazoLimite,
      pessoaId: data.pessoa,
      isConcluida: data.isConcluida,
    };

    handleCriarTarefa(novaTarefa);
    setModalAberto(false);
    reset();
    
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={() => setModalAberto(true)} sx={{ position: 'fixed', bottom: 30, right: 30 }}>
        <AddIcon />
      </Fab>

      <Modal open={modalAberto} onClose={() => { setModalAberto(false); reset(); }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <Paper sx={{ p: 4, width: 'auto', maxWidth: 600, position: 'relative', borderRadius: 2, boxShadow: 3 }}>
            <IconButton onClick={() => { setModalAberto(false); reset(); }} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>
            <Typography component="h2" variant="h5" gutterBottom>
              Adicionar Nova Tarefa
            </Typography>
            <form onSubmit={handleSubmit(lidarComEnvio)}>
              <TextField
                label="Título da Tarefa"
                fullWidth
                margin="normal"
                {...register('titulo')}
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
              <TextField
                label="Descrição da Tarefa"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                {...register('descricao')}
                error={!!errors.descricao}
                helperText={errors.descricao?.message}
              />
              <TextField
                label="Data Prazo Limite"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register('dataPrazoLimite')}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Pessoa Responsável</InputLabel>
                <Select
                  {...register('pessoa')}
                  error={!!errors.pessoa}
                >
                  <MenuItem value=""><em>Selecione uma Pessoa</em></MenuItem>
                  {pessoas.map((pessoa) => (
                    <MenuItem key={pessoa.id} value={pessoa.id}>
                      {pessoa.nome}
                    </MenuItem>
                  ))}
                </Select>
                {errors.pessoa && <Typography color="error">{errors.pessoa.message}</Typography>}
              </FormControl>
              <FormControlLabel
                control={<Checkbox {...register('isConcluida')} />}
                label="Concluída"
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Criar Tarefa
                </Button>
                <Button variant="outlined" onClick={() => { setModalAberto(false); reset(); }}>
                  Cancelar
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
}

export default FormularioTarefaModal;
