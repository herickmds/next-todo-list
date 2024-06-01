
# Todo-List

## Descrição
Este é um projeto de frontend desenvolvido com Next.js, Tailwind CSS, e outras bibliotecas modernas para criar um aplicativo de gerenciamento de tarefas. O projeto inclui funcionalidades de autenticação, gerenciamento de tarefas, e uma interface de usuário responsiva.

## Estrutura do Projeto
A estrutura do projeto é organizada da seguinte forma:

```
.
├── public/                     # Arquivos públicos
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── components/             # Componentes React reutilizáveis
│   │   ├── FormularioTarefaModal.js
│   │   ├── Layout.js
│   │   ├── ListaTarefas.js
│   │   ├── Navbar.js
│   │   ├── PrivateRoute.js
│   │   └── ProtectedRoute.js
│   ├── constants/              # Constantes do projeto
│   │   └── validationMessages.js
│   ├── contexts/               # Contextos React para gerenciamento de estado
│   │   └── userContext.js
│   ├── hooks/                  # Hooks personalizados
│   │   └── useTarefas.js
│   ├── pages/                  # Páginas do Next.js
│   │   ├── index.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── _app.js
│   ├── services/               # Serviços para chamadas de API
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   ├── pessoa.js
│   │   │   └── tarefa.js
│   │   └── config/
│   │       └── axiosConfig.js
│   ├── styles/                 # Arquivos de estilo
│   │   ├── FormularioTarefaModal.css
│   │   ├── globals.css
│   │   └── Tarefa.module.css
│   ├── utils/                  # Utilitários
│   │   └── handleErrors.js
│   └── validation/             # Esquemas de validação
│       ├── formCadastroSchema.js
│       ├── formEdicaoSchema.js
│       ├── loginSchema.js
│       └── registerSchema.js
├── .eslintrc.json              # Configuração do ESLint
├── .gitignore                  # Arquivos a serem ignorados pelo Git
├── next.config.mjs             # Configuração do Next.js
├── next-env.d.ts               # Definições de tipos do Next.js
├── package.json                # Dependências do projeto
├── package-lock.json           # Bloqueio de versões das dependências
├── postcss.config.mjs          # Configuração do PostCSS
├── tailwind.config.ts          # Configuração do Tailwind CSS
└── tsconfig.json               # Configuração do TypeScript
```

## Instalação
Siga os passos abaixo para instalar e executar o projeto localmente:

Clone o repositório:
```sh
git clone https://github.com/herickmds/next-todo-list.git
cd seu-repositorio
```

Instale as dependências:
```sh
npm install
```

Execute o servidor de desenvolvimento:
```sh
npm run dev
```

Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis
No diretório do projeto, você pode executar:

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm start`: Inicia o servidor de produção.

## Tecnologias Utilizadas
- **Next.js** - Framework React para produção.
- **Tailwind CSS** - Framework CSS utilitário.
- **Axios** - Cliente HTTP para fazer requisições.
- **Yup** - Biblioteca para validação de esquemas.
- **React Hook Form** - Gerenciamento de formulários em React.

## Funcionalidades
- Autenticação de usuários (login e registro).
- Gerenciamento de tarefas (criação, visualização, edição e exclusão).
- Interface de usuário responsiva.
- Validação de formulários.

## Contribuição
Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Envie para o repositório remoto (`git push origin feature/nova-feature`).
5. Abra um pull request.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---
Criado por Herick Marçal dos Santos
