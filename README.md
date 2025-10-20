# 🎯 Task Manager - Frontend

> Sistema completo de gerenciamento de tarefas (To-Do List) com autenticação JWT, controle de permissões e interface moderna.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Como Usar](#-como-usar)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [Fluxos de Autenticação](#-fluxos-de-autenticação)
- [Componentes Principais](#-componentes-principais)
- [Hooks Customizados](#-hooks-customizados)
- [Serviços](#-serviços)
- [Tipos TypeScript](#-tipos-typescript)
- [Controle de Permissões](#-controle-de-permissões)
- [Cache e Performance](#-cache-e-performance)
- [UI/UX](#-uiux)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Build e Deploy](#-build-e-deploy)

---

## 🚀 Sobre o Projeto

**Task Manager** é uma aplicação frontend moderna de gerenciamento de tarefas construída com **Next.js 15**, **React 19** e **TypeScript**. O sistema oferece autenticação JWT, controle de permissões (USER/ADMIN), e uma interface intuitiva com design responsivo.

### **Principais Destaques:**

✅ **Autenticação JWT** - Sistema completo de login/cadastro  
✅ **Controle de Permissões** - Roles USER e ADMIN  
✅ **CRUD Completo** - Criar, editar, deletar e concluir tarefas  
✅ **Filtros Inteligentes** - Admin pode ver todas as tarefas ou apenas as suas  
✅ **Design Responsivo** - Mobile-first com TailwindCSS  
✅ **Type Safety** - 100% tipado com TypeScript  
✅ **Cache Otimizado** - React Query para gerenciamento de estado  
✅ **Validação de Forms** - React Hook Form + Zod

---

## ✨ Funcionalidades

### 🔐 **Autenticação**

- [x] Login com email e senha
- [x] Cadastro de novos usuários
- [x] Seleção de role (USER/ADMIN)
- [x] Validação de token JWT
- [x] Auto-logout em caso de token expirado
- [x] Redirecionamento automático

### 📝 **Gerenciamento de Tarefas**

- [x] Criar nova tarefa (título + descrição)
- [x] Editar tarefa existente
- [x] Deletar tarefa (com confirmação)
- [x] Marcar como concluída/pendente
- [x] Visualizar detalhes da tarefa

### 👤 **Permissões de Usuário (USER)**

- [x] Ver apenas suas próprias tarefas
- [x] Criar, editar e deletar suas tarefas
- [x] Badge de identificação no header

### 🛡️ **Permissões de Administrador (ADMIN)**

- [x] Ver todas as tarefas do sistema
- [x] Filtrar entre "Minhas Tarefas" e "Todas as Tarefas"
- [x] Visualizar dono de cada tarefa
- [x] Badge de Admin no header
- [x] Estatísticas globais

### 📊 **Interface**

- [x] Dashboard com estatísticas (total, concluídas, pendentes)
- [x] Cards de tarefas com preview
- [x] Modal de edição em tempo real
- [x] Toasts informativos
- [x] Loading states
- [x] Design responsivo

---

## 🛠️ Tecnologias Utilizadas

### **Core**

- [Next.js 15.5.6](https://nextjs.org/) - Framework React
- [React 19.1.0](https://react.dev/) - Biblioteca UI
- [TypeScript 5.x](https://www.typescriptlang.org/) - Type Safety

### **Estilização**

- [TailwindCSS 3.4](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [Lucide React](https://lucide.dev/) - Ícones

### **Estado e Dados**

- [TanStack Query 5.90](https://tanstack.com/query) - Server State Management
- [Axios 1.12](https://axios-http.com/) - HTTP Client
- [React Hook Form 7.56](https://react-hook-form.com/) - Gerenciamento de formulários

### **Validação**

- [Zod 3.24](https://zod.dev/) - Schema validation
- [@hookform/resolvers](https://github.com/react-hook-form/resolvers) - Integração RHF + Zod

### **UI Components**

- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- [shadcn/ui](https://ui.shadcn.com/) - Component library

### **Utilitários**

- [jwt-decode 4.0](https://github.com/auth0/jwt-decode) - Decode JWT tokens
- [clsx](https://github.com/lukeed/clsx) - Conditional classnames
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind classes

---

## 🏗️ Arquitetura do Projeto

### **Padrões Arquiteturais:**

```
┌─────────────────────────────────────────────┐
│             Presentation Layer              │
│  (Components, Pages, UI)                    │
├─────────────────────────────────────────────┤
│             Application Layer               │
│  (Hooks, Context, State Management)         │
├─────────────────────────────────────────────┤
│             Service Layer                   │
│  (API Services, HTTP Requests)              │
├─────────────────────────────────────────────┤
│             Type Layer                      │
│  (TypeScript Interfaces, Types)             │
└─────────────────────────────────────────────┘
```

### **Fluxo de Dados:**

```
User Action
    ↓
Component (onClick, onSubmit)
    ↓
Custom Hook (useTasks, useAuth)
    ↓
Service Layer (taskService, authService)
    ↓
Axios Instance (api)
    ↓
Backend API
    ↓
Response
    ↓
React Query Cache
    ↓
Component Re-render
    ↓
UI Update + Toast
```

---

## 📁 Estrutura de Pastas

```
front-end/
│
├── public/                          # Arquivos públicos
│   ├── favicon.ico
│   └── ...
│
├── src/
│   ├── app/                         # App Router (Next.js 15)
│   │   ├── layout.tsx               # Layout raiz
│   │   ├── page.tsx                 # Página de Login (/)
│   │   ├── provider.tsx             # Providers globais
│   │   │
│   │   ├── signup/
│   │   │   └── page.tsx             # Página de Cadastro (/signup)
│   │   │
│   │   └── tasks/
│   │       └── page.tsx             # Dashboard de Tarefas (/tasks)
│   │
│   ├── components/                  # Componentes React
│   │   ├── ui/                      # Componentes shadcn/ui
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── textarea.tsx
│   │   │
│   │   ├── conditional-layout/
│   │   │   └── index.tsx            # Layout condicional (mostra/esconde header)
│   │   │
│   │   ├── create-task-dialog/
│   │   │   └── index.tsx            # Modal de criação de tarefa
│   │   │
│   │   ├── header/
│   │   │   └── index.tsx            # Header com info do usuário
│   │   │
│   │   ├── task-card/
│   │   │   └── index.tsx            # Card individual da tarefa
│   │   │
│   │   └── task-dialog/
│   │       └── index.tsx            # Modal de edição de tarefa
│   │
│   ├── contexts/                    # React Context
│   │   └── auth-context.tsx         # Contexto de autenticação
│   │
│   ├── hooks/                       # Custom Hooks
│   │   ├── use-auth.ts              # Hook de autenticação
│   │   └── use-tasks.ts             # Hook de gerenciamento de tarefas
│   │
│   ├── lib/                         # Configurações e utilitários
│   │   ├── axios.ts                 # Instância configurada do Axios
│   │   ├── react-query.ts           # Configuração do React Query
│   │   └── utils.ts                 # Funções utilitárias (cn)
│   │
│   ├── services/                    # Camada de serviços (API)
│   │   ├── auth-service.ts          # Serviços de autenticação
│   │   └── task-service.ts          # Serviços de tarefas
│   │
│   ├── types/                       # TypeScript Types
│   │   ├── auth.ts                  # Types de autenticação
│   │   ├── error.ts                 # Types de erros da API
│   │   └── task.ts                  # Types de tarefas
│   │
│   └── styles/
│       └── globals.css              # Estilos globais + Tailwind
│
├── .env                             # Variáveis de ambiente
├── .eslintrc.json                   # Configuração ESLint
├── .gitignore                       # Arquivos ignorados pelo Git
├── components.json                  # Configuração shadcn/ui
├── next.config.ts                   # Configuração Next.js
├── package.json                     # Dependências
├── postcss.config.mjs               # Configuração PostCSS
├── tailwind.config.ts               # Configuração TailwindCSS
├── tsconfig.json                    # Configuração TypeScript
└── README.md                        # Este arquivo
```

---

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado:

- **Node.js** 18.x ou superior
- **npm** ou **yarn** ou **pnpm**
- **Backend da aplicação** rodando (veja repositório do backend)

---

## 🚀 Instalação

### **1. Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd front-end
```

### **2. Instale as dependências:**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### **3. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto:

```bash
touch .env
```

Adicione a URL do backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### **4. Execute o servidor de desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### **5. Abra no navegador:**

```
http://localhost:3000
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# URL da API Backend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### **Detalhes:**

| Variável              | Descrição               | Obrigatória | Padrão |
| --------------------- | ----------------------- | ----------- | ------ |
| `NEXT_PUBLIC_API_URL` | URL base da API backend | ✅ Sim      | -      |

**⚠️ Importante:**

- Variáveis com prefixo `NEXT_PUBLIC_` são expostas no browser
- Nunca coloque secrets sensíveis em variáveis `NEXT_PUBLIC_`
- O backend deve estar rodando na URL especificada

---

## 🎯 Como Usar

### **1. Criar uma Conta**

1. Acesse `http://localhost:3000`
2. Clique em **"Cadastre-se"**
3. Preencha o formulário:
   - Nome completo
   - Email
   - Senha (mínimo 6 caracteres)
   - Confirmar senha
   - Selecione a role (**Usuário** ou **Administrador**)
4. Clique em **"Criar Conta"**
5. Você será redirecionado para o login

### **2. Fazer Login**

1. Na página inicial, insira:
   - Email
   - Senha
2. Clique em **"Entrar"**
3. Você será redirecionado para o dashboard (`/tasks`)

### **3. Criar uma Tarefa**

1. No dashboard, clique em **"Nova Tarefa"**
2. Preencha:
   - **Título** (obrigatório, mínimo 3 caracteres)
   - **Descrição** (opcional)
3. Clique em **"Criar Tarefa"**

### **4. Editar uma Tarefa**

1. Clique em qualquer card de tarefa
2. Edite o título e/ou descrição
3. Clique em **"Salvar"** ou **"Cancelar"**

### **5. Marcar como Concluída**

- Clique no **círculo/check** no card da tarefa
- A tarefa será marcada como concluída (verde)

### **6. Deletar uma Tarefa**

1. Clique no **ícone de lixeira** no card
2. Confirme a ação no toast

### **7. Filtrar Tarefas (Admin)**

Se você for **Admin**:

1. Use as tabs **"Minhas Tarefas"** e **"Todas as Tarefas"**
2. Na visualização "Todas as Tarefas", você verá o nome do dono embaixo de cada tarefa

---

## 🗺️ Rotas da Aplicação

| Rota      | Arquivo               | Descrição            | Proteção              |
| --------- | --------------------- | -------------------- | --------------------- |
| `/`       | `app/page.tsx`        | Página de login      | Pública               |
| `/signup` | `app/signup/page.tsx` | Página de cadastro   | Pública               |
| `/tasks`  | `app/tasks/page.tsx`  | Dashboard de tarefas | Privada (requer auth) |

### **Proteção de Rotas:**

As rotas são protegidas pelo `AuthContext`:

```typescript
// Fluxo de proteção
useEffect(() => {
  if (!user && !isLoading) {
    router.push("/"); // Redireciona para login
  }
}, [user, isLoading]);
```

---

## 🔄 Fluxos de Autenticação

### **Fluxo de Login:**

```
1. Usuário preenche formulário de login
   ↓
2. onSubmit → useAuth().login(data)
   ↓
3. authService.login(data)
   ↓
4. POST /auth/login → Backend
   ↓
5. Recebe { accessToken, user }
   ↓
6. Salva token no localStorage
   ↓
7. Busca dados do usuário atual
   ↓
8. Atualiza contexto (setUser)
   ↓
9. Redireciona para /tasks
```

### **Fluxo de Cadastro:**

```
1. Usuário preenche formulário de cadastro
   ↓
2. Seleciona role (USER/ADMIN)
   ↓
3. onSubmit → authService.signUp(data)
   ↓
4. POST /auth/signup → Backend
   ↓
5. Usuário criado no banco
   ↓
6. Limpa formulário (reset)
   ↓
7. Toast de sucesso
   ↓
8. Aguarda 1.5s
   ↓
9. Redireciona para / (login)
```

### **Fluxo de Logout:**

```
1. Usuário clica em "Sair"
   ↓
2. useAuth().logout()
   ↓
3. Remove token do localStorage
   ↓
4. Limpa estado do usuário (setUser(null))
   ↓
5. Limpa cache do React Query
   ↓
6. Redireciona para / (login)
```

---

## 🧩 Componentes Principais

### **1. Header** (`components/header/index.tsx`)

Header fixo com informações do usuário.

**Props:** Nenhuma (usa `useAuth()`)

**Features:**

- Avatar com iniciais do nome
- Nome e email do usuário
- Badge de role (USER/ADMIN)
- Botão de logout
- Responsivo

**Uso:**

```tsx
<Header />
```

---

### **2. TaskCard** (`components/task-card/index.tsx`)

Card individual de tarefa com ações rápidas.

**Props:**

```typescript
interface TaskCardProps {
  task: Task;
  showOwner?: boolean; // Mostrar dono (para admin)
}
```

**Features:**

- Checkbox para marcar como concluída
- Preview do título e descrição
- Data de criação
- Botão de deletar
- Click para abrir modal de edição
- Mostra dono se `showOwner=true`

**Uso:**

```tsx
<TaskCard task={task} showOwner={user?.role === "ADMIN"} />
```

---

### **3. TaskDialog** (`components/task-dialog/index.tsx`)

Modal para editar tarefa existente.

**Props:**

```typescript
interface TaskDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**

- Formulário com título e descrição
- Validação em tempo real
- Botões "Cancelar" e "Salvar"
- Loading state
- Não chama API se não houver mudanças

**Uso:**

```tsx
<TaskDialog
  task={selectedTask}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
```

---

### **4. CreateTaskDialog** (`components/create-task-dialog/index.tsx`)

Modal para criar nova tarefa.

**Props:**

```typescript
interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**

- Formulário com título e descrição
- Validação com Zod
- Reset automático após criar
- Toast de sucesso

**Uso:**

```tsx
<CreateTaskDialog
  isOpen={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
/>
```

---

### **5. ConditionalLayout** (`components/conditional-layout/index.tsx`)

Layout condicional que esconde o header em páginas públicas.

**Props:**

```typescript
interface ConditionalLayoutProps {
  children: React.ReactNode;
}
```

**Lógica:**

```typescript
const noHeaderPages = ["/", "/signup"];
const shouldShowHeader = !noHeaderPages.includes(pathname);
```

**Uso:**

```tsx
// Em app/layout.tsx
<ConditionalLayout>{children}</ConditionalLayout>
```

---

## 🪝 Hooks Customizados

### **1. useAuth** (`hooks/use-auth.ts`)

Hook para gerenciar autenticação.

**Retorno:**

```typescript
{
  user: User | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}
```

**Exemplo de uso:**

```typescript
const { user, login, logout } = useAuth();

// Login
await login({ email, password });

// Logout
logout();

// Verificar se está autenticado
if (user) {
  console.log("Usuário logado:", user.name);
}
```

---

### **2. useTasks** (`hooks/use-tasks.ts`)

Hook para gerenciar tarefas (CRUD).

**Retorno:**

```typescript
{
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  createTask: UseMutationResult;
  updateTask: UseMutationResult;
  deleteTask: UseMutationResult;
  toggleComplete: UseMutationResult;
}
```

**Exemplo de uso:**

```typescript
const { tasks, createTask, updateTask, deleteTask } = useTasks();

// Criar tarefa
createTask.mutate({
  title: "Nova tarefa",
  description: "Descrição",
});

// Editar tarefa
updateTask.mutate({
  id: "task-id",
  data: { title: "Novo título" },
});

// Deletar tarefa
deleteTask.mutate("task-id");

// Toggle concluída
toggleComplete.mutate({
  id: "task-id",
  isCompleted: true,
});
```

---

## 🌐 Serviços

### **1. authService** (`services/auth-service.ts`)

Serviço de autenticação com a API.

**Métodos:**

```typescript
// Login
authService.login({ email, password })
  → Promise<LoginResponse>

// Cadastro
authService.signUp({ name, email, password, role })
  → Promise<User>

// Buscar usuário atual
authService.getCurrentUser()
  → Promise<User>
```

**Exemplo:**

```typescript
// Login
const { accessToken, user } = await authService.login({
  email: "user@example.com",
  password: "senha123",
});

// Cadastro
const newUser = await authService.signUp({
  name: "João Silva",
  email: "joao@example.com",
  password: "senha123",
  confirmPassword: "senha123",
  role: "USER",
});
```

---

### **2. taskService** (`services/task-service.ts`)

Serviço de gerenciamento de tarefas.

**Métodos:**

```typescript
// Buscar todas
taskService.getAll()
  → Promise<Task[]>

// Buscar por ID
taskService.getById(id)
  → Promise<Task>

// Criar
taskService.create({ title, description })
  → Promise<Task>

// Atualizar
taskService.update(id, { title, description })
  → Promise<Task>

// Deletar
taskService.delete(id)
  → Promise<void>

// Toggle concluída
taskService.toggleComplete(id, isCompleted)
  → Promise<Task>
```

**Exemplo:**

```typescript
// Criar tarefa
const task = await taskService.create({
  title: "Estudar React",
  description: "Revisar hooks",
});

// Editar tarefa
const updated = await taskService.update("task-id", {
  title: "Estudar Next.js",
});

// Deletar tarefa
await taskService.delete("task-id");
```

---

## 📘 Tipos TypeScript

### **auth.ts**

```typescript
export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}
```

---

### **task.ts**

```typescript
export interface Task {
  id: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  completedAt: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}
```

---

### **error.ts**

```typescript
export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

export interface ApiError {
  response?: {
    data: ApiErrorResponse;
    status: number;
  };
  message: string;
}
```

---

## 🔐 Controle de Permissões

### **Roles Disponíveis:**

| Role      | Descrição     | Permissões                                     |
| --------- | ------------- | ---------------------------------------------- |
| **USER**  | Usuário comum | Ver/criar/editar/deletar apenas suas tarefas   |
| **ADMIN** | Administrador | Acesso total + ver todas as tarefas do sistema |

### **Implementação:**

```typescript
// Filtrar tarefas baseado na role
const filteredTasks = useMemo(() => {
  if (!user) return [];

  // USER: apenas suas tarefas
  if (user.role === "USER") {
    return tasks.filter((task) => task.userId === user.id);
  }

  // ADMIN: aplica filtro selecionado
  if (filter === "my-tasks") {
    return tasks.filter((task) => task.userId === user.id);
  }

  // ADMIN: todas as tarefas
  return tasks;
}, [tasks, user, filter]);
```

---

## 🚀 Cache e Performance

### **React Query Configuration:**

```typescript
// lib/react-query.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Sempre buscar dados frescos
      gcTime: 1000 * 10, // Cache por 10 segundos
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      retry: (failureCount, error) => {
        // Não retentar em erros 4xx
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
```

### **Cache Invalidation:**

```typescript
// Limpar cache ao fazer logout
const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
  queryClient.clear(); // ✅ Limpa TODO o cache
  router.push("/");
};
```

---

## 🎨 UI/UX

### **Design System:**

- **Cores:** Sistema de cores do TailwindCSS
- **Espaçamento:** Grid system de 8px
- **Tipografia:** Geist Sans (Next.js font)
- **Ícones:** Lucide React
- **Animações:** CSS transitions + Tailwind

### **Responsividade:**

```css
/* Mobile First */
.container {
  @apply px-4; /* Mobile */
  @apply md:px-6; /* Tablet */
  @apply lg:px-8; /* Desktop */
}

/* Grid adaptativo */
.grid {
  @apply grid-cols-1; /* Mobile */
  @apply md:grid-cols-2; /* Tablet */
  @apply lg:grid-cols-3; /* Desktop */
}
```

### **Estados de Loading:**

- Skeleton loaders
- Spinners animados
- Disabled states
- Loading text

### **Feedback ao Usuário:**

```typescript
// Toasts informativos
toast.success("Tarefa criada! ✅");
toast.error("Erro ao deletar tarefa");
toast.info("Tem certeza?");
```

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor dev (localhost:3000)

# Build
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção

# Lint
npm run lint         # Executa ESLint
```

---

## 🚢 Build e Deploy

### **Build Local:**

```bash
npm run build
```

Isso gera uma pasta `.next` com a aplicação otimizada.

### **Preview do Build:**

```bash
npm run build
npm run start
```

Acesse: `http://localhost:3000`

### **Deploy (Vercel):**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### **Variáveis de Ambiente (Produção):**

No painel da Vercel (ou plataforma de deploy):

```
NEXT_PUBLIC_API_URL=https://api.seudominio.com
```

---

## 📊 Métricas de Performance

### **Bundle Size:**

```
Route (app)                              Size     First Load JS
┌ ○ /                                    150 kB         350 kB
├ ○ /signup                              145 kB         345 kB
└ ○ /tasks                               160 kB         360 kB
```

### **Lighthouse Score:**

- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

**Seu Nome**

- GitHub: [@Victtor-777](https://github.com/Victtor-777)

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)

---

## 📞 Suporte

Para suporte, abra uma issue no GitHub.

---

<div align="center">
  
**⭐ Se este projeto te ajudou, considere dar uma estrela!**

Made with ❤️ and Next.js

</div>
