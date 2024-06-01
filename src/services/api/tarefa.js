import axiosInstance from '../config/axiosConfig';

export async function buscarTarefas() {
  try {
    const resposta = await axiosInstance.get('/tarefas');
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

export async function criarTarefa(tarefa) {
  try {
    const resposta = await axiosInstance.post('/tarefas', tarefa);
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

export async function atualizarTarefa(id, tarefa) {
  try {
    const resposta = await axiosInstance.put(`/tarefas/${id}`, tarefa);
    return resposta.data;
  } catch (erro) { 
    throw erro;
  }
}

export async function excluirTarefa(id) {
  try {
    await axiosInstance.delete(`/tarefas/${id}`);
  } catch (erro) { 
    throw erro;
  }
}
