import { useState, useEffect } from 'react';
import { buscarTarefas, criarTarefa, atualizarTarefa, excluirTarefa as excluirTarefaAPI } from '../services/api/tarefa';
import { messages } from '../constants/validationMessages';  

export function useTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const obterTarefas = async () => {
      try {
        const tarefasDoServidor = await buscarTarefas();
        setTarefas(tarefasDoServidor);
      } catch (erro) {
        setErro(messages.tarefas.buscarErro);  
      }
    };
    obterTarefas();
  }, []);

  const adicionarTarefa = async (tarefa) => {
    try {
      const novaTarefa = await criarTarefa(tarefa);
      setTarefas([...tarefas, novaTarefa]);
    } catch (erro) {
      setErro(messages.tarefas.criarErro); 
    }
  };

  const excluirTarefa = async (id) => {
    try {
      await excluirTarefaAPI(id);
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (erro) {
      setErro(messages.tarefas.excluirErro);
    }
  };

  const editarTarefa = async (id, tarefaAtualizada) => {
    try {
      const tarefa = await atualizarTarefa(id, tarefaAtualizada);
      setTarefas(tarefas.map((t) => (t.id === tarefa.id ? tarefa : t)));
    } catch (erro) {
      setErro(messages.tarefas.atualizarErro);
    }
  };

  return {
    tarefas,
    erro,
    adicionarTarefa,
    excluirTarefa,
    editarTarefa,
  };
}
