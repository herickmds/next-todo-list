import FormularioTarefaModal from '../components/FormularioTarefaModal'; 
import { useTarefas } from '../hooks/useTarefas';
import PrivateRoute from '../components/PrivateRoute';
import ListaTarefas from '../components/ListaTarefas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const { tarefas, erro, adicionarTarefa, excluirTarefa, editarTarefa } = useTarefas();

  return (
    <>  
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <PrivateRoute>
          <div className="container mx-auto p-4">
            {erro && <div className="text-red-500">{erro}</div>}
            <FormularioTarefaModal handleCriarTarefa={adicionarTarefa} /> 
            <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {tarefas.map((tarefa) => (
                <ListaTarefas id={tarefa.id} tarefa={tarefa} handleExcluir={excluirTarefa} handleEditar={editarTarefa} />
              ))}
            </div>
          </div>
        </PrivateRoute> 
    </>
  );
}
