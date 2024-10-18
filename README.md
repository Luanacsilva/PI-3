Este repositório contém o backend do projeto PI-3, desenvolvido utilizando Node.js, Express, Prisma e outras bibliotecas populares como JWT para autenticação e 
bcrypt para criptografia de senhas.

Tecnologias Utilizadas
Node.js - Plataforma JavaScript para backend.
Express - Framework para criação de APIs.
Prisma - ORM para banco de dados.
JWT (jsonwebtoken) - Biblioteca para autenticação via tokens JWT.
bcrypt - Biblioteca para criptografia de senhas.
TypeScript - Linguagem utilizada para garantir tipagem estática.
Zod - Validação de dados.
Estrutura do Projeto
bash
Copiar código
PI-3-main/
│
├── prisma/                # Configurações do Prisma e esquemas de banco de dados
├── src/                   # Código-fonte principal do backend
│   ├── controllers/       # Controladores de rotas e regras de negócios
│   ├── routes/            # Definições de rotas da API
│   ├── middlewares/       # Middlewares como autenticação
│   ├── services/          # Lógica de serviços
│   └── utils/             # Utilitários e helpers
├── .gitignore             # Arquivos e diretórios ignorados pelo Git
├── package.json           # Dependências e scripts do projeto
└── tsconfig.json          # Configurações do TypeScript
Pré-requisitos
Node.js (v14 ou superior)
NPM (v6 ou superior)
Banco de dados compatível com Prisma (PostgreSQL, MySQL, SQLite, etc.)
Instalação
Clone o repositório:

bash
Copiar código
git clone https://github.com/usuario/PI-3-backend.git
Instale as dependências:

bash
Copiar código
npm install
Configure o arquivo .env com suas variáveis de ambiente, como as credenciais de conexão com o banco de dados.

Execute as migrações do Prisma para criar o banco de dados:

bash
Copiar código
npx prisma migrate dev
Executando o Projeto
Para rodar o servidor em modo de desenvolvimento:

bash
Copiar código
npm run dev
O servidor estará disponível em http://localhost:3000.

Funcionalidades
Autenticação - Sistema de login com criptografia de senha e geração de tokens JWT.
Gerenciamento de usuários - CRUD para usuários, incluindo criação, leitura, atualização e exclusão.
Integração com banco de dados - Prisma ORM para comunicação com o banco de dados.
Scripts Disponíveis
npm run dev: Inicia o servidor no modo de desenvolvimento e observa as mudanças nos arquivos.
Licença
Este projeto é licenciado sob a licença ISC



ROTAS

Rotas de Autenticação (auth_routes.ts)
POST /auth/login: Realiza o login de um usuário, retornando um token JWT.
Rotas de Usuários (user_routes.ts)
POST /users: Cria um novo usuário.
GET /users: Retorna a lista de usuários.
GET /users/:id: Retorna os detalhes de um usuário específico.
PUT /users/:id: Atualiza um usuário existente.
DELETE /users/:id: Remove um usuário.
Rotas de Classes (class_routes.ts)
POST /classes: Cria uma nova classe.
GET /classes: Retorna a lista de classes.
GET /classes/:id: Retorna os detalhes de uma classe específica.
PUT /classes/:id: Atualiza uma classe existente.
DELETE /classes/:id: Remove uma classe.
Rotas de Notas (grade_routes.ts)
POST /grades: Cria uma nova nota.
GET /grades: Retorna a lista de notas.
GET /grades/:id: Retorna os detalhes de uma nota específica.
PUT /grades/:id: Atualiza uma nota existente.
DELETE /grades/:id: Remove uma nota.
Rotas de Anúncios (announcement_routes.ts)
POST /announcements: Cria um novo anúncio.
GET /announcements: Retorna a lista de anúncios.
GET /announcements/:id: Retorna os detalhes de um anúncio específico.
PUT /announcements/:id: Atualiza um anúncio existente.
DELETE /announcements/:id: Remove um anúncio.
Rotas de Disciplinas (subject_routes.ts)
POST /subjects: Cria uma nova disciplina.
GET /subjects: Retorna a lista de disciplinas.
GET /subjects/:id: Retorna os detalhes de uma disciplina específica.
PUT /subjects/:id: Atualiza uma disciplina existente.
DELETE /subjects/:id: Remove uma disciplina.
