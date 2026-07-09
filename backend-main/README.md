## Progress

### Status

- ✅ Done
- 🟡 Partial
- ⚪ Not Implemented

### Features

| Category | Features / Sub-features | Status |
| :--- | :--- | :---: |
| **Database Schema** | About, Articles (Images), Alumnis, Buildings, Classroom, Complains, Personnels, Projects | ✅ |
| | Programs (Courses, Groups, Study Plan) | ✅ |
| | Users (Basic Info, Password, Roles) | ✅ |
| | Home (Features, Carousels, Testimonials, Contacts) | ✅ |
| | Events | 🟡 |
| **Authentication** | Login/Logout, Cookie Session | ✅ |
| | Role-based access (needs refinement) | 🟡 |
| **File Upload** | Single/Multi Image, Non-image file, Storage by category | ✅ |
| **System** | Data Seeder | ✅ |
| | Migration Scripts | ✅ |
| | E2E Testing (*Cancelled*) | ⚪ |

## Getting Started


### Prerequisites

- [Node.js](https://nodejs.org/en/) (v24 or later)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://gitlab.csmju.com/kraken/backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Local Development

### Without Docker

1. Create a `.env` file based on `example.env`.
2. Install node dependencies
   ```bash
   pnpm install
   ```
3. Start the application in development mode:
   ```bash
   pnpm start:dev
   ```
   The application will be available at `http://localhost:4000`.

### With Docker

1. Create a `.env` file based on `example.env`.
2. Create a docker network name public-network
   ```bash
   docker network create public-network
   ```
3. Go to your backend directory and run this command
   ```bash
   docker compose up -d
   ```

This will setup PostgreSQL and Adminer (DB Tools) for you available at [localhost:8080](http://localhost:8080/)

## Scripts

- `pnpm run build`: Compiles the application.
- `pnpm run start:dev`: Starts the application in development mode with watch.
- `pnpm run lint`: Lints the code.
- `pnpm seed`: Run seeder module
- `pnpm migrate:data:from-legacy`: Migrate scripts for migrate data from mysql to postgres (old project to this)
- `pnpm migration:run`: Run database migration

## API Documentation

- **Swagger UI**: [localhost:4000/api-docs](http://localhost:4000/api-docs)
- **Redoc**: [localhost:4000/docs](http://localhost:4000/docs)

## Export/Import Data

### Assuming Postgres is on Docker (Local) and you're on a Windows

- Export from Windows to Cloud or Linux (Ubuntu)

1. Export a file from Postgres

```
docker exec <CONTAINER_NAME or ID> pg_dump -U <PG_USERNAME> -d <PG_DATABASE> -f /tmp/export.sql
```

2. Copy export.sql to your own machine

```
docker cp <CONTAINERNAME or ID>:/tmp/export.sql <YOUR DIRECTORY (e.g D:\)>
```

3. Check the content of export file to ensure that its readable (Windows)

- It should contains these message
- --PostgreSQL database dump

```
Get-Content <FILE_LOCATION> -Head 4
```

4. Transfer exported file to your cloud (to better protect your files while transferring zip it first)

```
pscp <FILE_LOCATION> your_user@your_cloud_ip:/home/your_user/
```

5. unzip your files (If you zip your files. If not skip this step)

```
unzip ~/your_file_name.zip
```

6. Push into the Cloud Container

```
docker cp ~/export.sql <CLOUD_CONTAINER_ID>:/tmp/export.sql
```

7. Import data

```
docker exec -it <CLOUD_CONTAINER_ID> psql -U postgres -d csmju -f /tmp/export.sql
```
