# Safa-System
Point Of Sell System (POS)

# TECH STACK
## Nextjs 13 / Node/ Express / Apoll-Server / Graphql / Prisma / Postgresql

## PostgreSQL Database.
user: safa\
database name: safa_db\
database password: 'safaSystem@2022’\
### Guide
CREATE USER safa WITH PASSWORD 'safaSystem@2022';\
CREATE DATABASE safa_db WITH OWNER safa;

#### permessions
grant all on DATABASE safa_db to safa.;
alter user safa WITH superuser;

## Development.
### Backend 
* cd backend
* pnpm install
* pnpm migrate:dev
* npx prisma db seed
* pnpm dev

### frontend
* cd frontend
* pnpm install
* pnpm dev

