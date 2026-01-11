# pern-shop (resumo rápido)

Projeto 'PERN Shop': app de e‑commerce exemplo (Node/Express + PostgreSQL + React/Vite). Oferece listagem e detalhes de produtos, criação/edição, comentários e autenticação.

**Stack:** Postgres, Express, React, Node (PERN)

## 🧩 Tecnologias principais

- **Backend:** Node + TypeScript, **Express**, **Drizzle ORM** (drizzle-orm), **pg**
- **Frontend:** React + **Vite**
- **Banco:** PostgreSQL (imagem em `docker-compose.yaml`)
- **Auth:** Clerk (`@clerk/express`)
- **Gerenciador de pacotes:** pnpm
- **Ferramentas dev:** nodemon, ts-node, drizzle-kit, eslint

## 🔧 Scripts úteis

- Backend (dentro de `back`):
  - `pnpm install`
  - `pnpm dev` (usa `nodemon`)
  - `pnpm run db:push` (drizzle-kit para migrations)
- Frontend (dentro de `front`):
  - `pnpm install`
  - `pnpm dev` (Vite)

## ♻️ Variáveis de ambiente importantes

- `DATABASE_URL` (Postgres)
- `PORT` (porta do backend)
- `FRONTEND_URL`
- `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

## 📁 Observações do projeto

- As queries de leitura ficam em `back/src/db/queries.ts` e as operações de escrita (INSERT/UPDATE/DELETE) foram movidas para `back/src/db/command.ts`.
- `drizzle.config.ts` está configurado para apontar para `src/db/schema.ts`.

---

Se quiser, eu adiciono instruções de deploy, um badge de status, ou exemplos rápidos de uso das rotas. ✨
