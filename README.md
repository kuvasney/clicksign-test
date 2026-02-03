# Clicksign Test

Aplicação web em React + Vite para gestão de projetos, com integração ao Supabase e TanStack Query.

## Estrutura do projeto

```
.
├── public
│   ├── img
│   ├── mockServiceWorker.js
│   └── ...
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── hooks
│   ├── mocks
│   ├── Pages
│   ├── store
│   ├── types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── ...
```

### Principais pastas

- **src/components**: componentes de UI
- **src/Pages**: páginas/rotas
- **src/hooks**: hooks (API, queries, etc.)
- **src/config**: configuração (Supabase, etc.)
- **src/types**: tipos TypeScript
- **src/store**: estado global (Zustand)
- **src/mocks**: mocks/fixtures

## Tecnologias e libs

- **React 19**
- **Vite 7**
- **TypeScript**
- **React Router DOM**
- **TanStack Query**
- **Supabase JS**
- **Zustand**
- **Tailwind CSS**
- **Sass**
- **MSW** (mock service worker)

## Instalação

> Este projeto usa **pnpm** (há `pnpm-lock.yaml`).

```bash
pnpm install
```

## Rodar em desenvolvimento

```bash
pnpm dev
```

## Build de produção

```bash
pnpm build
```

## Preview do build

```bash
pnpm preview
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Observações

- A integração com Supabase exige configuração de **RLS/Policies** nas tabelas e no bucket de storage.
- O bucket de imagens esperado é `project-cover`.
