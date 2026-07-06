# Rescate de Proyecto

Leer primero `INSTRUCCIONES_CANDIDATO.md`.

## Contexto

Módulo de ingreso de órdenes de compra (cabecera + detalle de productos). Código heredado incompleto.

## Stack

- Frontend: React 18, TypeScript, TanStack Query, TanStack Form
- Backend: Node.js, TypeScript, Express, CQRS
- Base de datos: PostgreSQL

## Estructura

```
rescate-proyecto/
├── INSTRUCCIONES_CANDIDATO.md
├── README.md
├── ARCHITECTURE.md
├── KNOWN_ISSUES.md
├── FINANCIAL_RULES.md
├── database/schema.sql
├── frontend/
└── backend/
```

## Documentación

- `ARCHITECTURE.md` — flujo y endpoints
- `KNOWN_ISSUES.md` — notas viejas del equipo
- `FINANCIAL_RULES.md` — IVA y totales

## Arranque con Docker Compose

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Esto construye y levanta los servicios de base de datos, backend y frontend. Una vez iniciados, puede abrir:

- Frontend: http://localhost:3000
- Backend: disponible internamente en el puerto 4000 para los servicios del compose

Para detenerlos:

```bash
docker compose down
```

Si quiere limpiar también los volúmenes de la base de datos:

```bash
docker compose down -v
```

## Arranque local

```bash
createdb orders
psql -d orders -f database/initdb/01-schema.sql
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

Backend: puerto 4000. Frontend: puerto 3000.

## Entrega

Repositorio Git + Pull Request. Ver `INSTRUCCIONES_CANDIDATO.md`.
