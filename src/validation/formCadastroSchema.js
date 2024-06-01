import * as yup from 'yup';
import { messages } from '../constants/validationMessages';

export const formCadastroSchema = yup.object({
  titulo: yup.string()
    .required(messages.titulo.required)
    .min(3, messages.titulo.minLength),
  descricao: yup.string()
    .required(messages.descricao.required)
    .min(5, messages.descricao.minLength),
  dataPrazoLimite: yup.date()
    .nullable(),
  pessoa: yup.number()
    .required(messages.pessoa.required),
  ehConcluida: yup.boolean()
});
 