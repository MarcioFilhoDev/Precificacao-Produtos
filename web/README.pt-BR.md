# Precificação de Produtos

Aplicação web em React + Vite para gestão de precificação de produtos, com autenticação, armazenamento e banco de dados com Firebase.

[Read this README in English](README.md).

## Tecnologias

- React
- TypeScript
- Vite
- Firebase Authentication
- Firestore
- Firebase Storage
- React Router
- Tailwind CSS

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js 18 ou superior
- npm
- Uma conta no Firebase

## Estrutura do projeto

```bash
web/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 1) Instalação

No diretório do projeto, execute:

```bash
npm install
```

## 2) Configuração do Firebase

Crie um projeto no Firebase e adicione um app web:

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Adicione um app web
4. Copie as credenciais do Firebase
5. Crie o arquivo `src/services/firebaseConnection.ts` se ele ainda não existir
6. Cole a configuração do seu projeto no arquivo

Exemplo:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

> Importante: substitua os valores de exemplo pelas credenciais reais do seu projeto Firebase.

## 3) Execução do projeto

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível no endereço padrão do Vite, geralmente:

```bash
http://localhost:5173
```

## 4) Build para produção

Para gerar a versão de produção:

```bash
npm run build
```

Depois disso, você pode visualizar a build localmente com:

```bash
npm run preview
```

## 5) Funcionalidades

- autenticação de usuários
- cadastro e login com escolha de persistência local ou não
- gerenciamento de produtos
- cálculo automático para precificação de produtos com base nos ingredientes de cada produto
- gestão de vendas
- dashboard com filtro integrado para visualização das vendas e do lucro por produto
- proteção entre rotas privadas e públicas
- integrações com Firebase para armazenamento e dados

## Dicas

- mantenha as chaves do Firebase em segurança
- caso use autenticação por email/senha, configure os métodos de login no Firebase
- verifique as regras de Firestore e Storage antes de testar em produção

## Observação

Este README foi pensado para facilitar a execução local e a conexão com o Firebase do projeto. Se você estiver trabalhando em um ambiente colaborativo, o ideal é manter as credenciais em variáveis de ambiente ou em um arquivo de configuração específico do projeto, de acordo com as políticas de segurança da equipe.