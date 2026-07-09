# Deployment

This repository contains the scripts and Docker Swarm configuration for deploying the `csmju_site` application. It utilizes a multi-container architecture with automated deployments via Shepherd and Swarm Configs.

There a two ways to deploy the stack.

- With traefik
- Without traefik

## Prerequisites

- Ubuntu 24 LTS
- A GitLab Deploy Token or Personal Access Token (PAT) with `read_registry` scope.

## Folders Structure

Before executing any scripts, your deployment directory must contains these files

    ~/deployment/
    ├── 01-setup-docker.sh
    ├── 02-app-setup.sh
    ├── docker-compose.yml
    ├── docker-compose.traefik.yml
    ├── traefik-compose.yml
    ├── example.env
    ├── .env               # MUST BE CREATED MANUALLY
    ├── backend.env        # MUST BE CREATED MANUALLY
    └── data               # Create automatically via scripts

## Installation and Deployment

1. **Clone this repository**

   ```
   git clone https://gitlab.csmju.com/kraken/deployment.git
   ```

2. **Make a copy of `example.env` as `.env` and do the same with `backend.env.example` to `backend.env`**

   Now fill the required config with your own information

   ### .env

   ```
   # Database
   POSTGRES_USERNAME=myuser
   POSTGRES_PASSWORD=mypassword

   # JWT
   JWT_SECRET=supersecretkey
   REFRESH_SECRET=anotherscretkey

   # GitLab
   GITLAB_TOKEN=glpat-xxxxxxxxxxxx

   # PgAdmin
   PGADMIN_PASSWORD=pgadminpassword
   PGADMIN_PASSWORD=pgadminpassword
   ```

   ### backend.env

   ```
   NODE_ENV=production
   APP_PORT=4000
   APP_NAME="CS-MJU API"
   API_PREFIX=api
   FRONTEND_DOMAIN=https://frontend.domain.com
   BACKEND_DOMAIN=https://backend.domain.com
   DOMAIN=".domain.com"

   DB_TYPE=postgres
   DB_HOST=postgres
   DB_PORT=5432
   DB_NAME=csmju
   ... rest of config

   AUTH_JWT_TOKEN_EXPIRES_IN=15m
   AUTH_REFRESH_TOKEN_EXPIRES_IN=30d
   ```

3. **Edit the configuration inside the file docker-compose.yml**

   There are 3 services config that needs to be updated `Migration`, `Shepherd` and `Postgres`

   ```
   DB_TYPE: postgres
   DB_HOST: webapp_postgres # CHANGE THIS
   DB_PORT: 5432
   DB_NAME: csmju # CHANGE THIS
   POSTGRES_DB: csmju # CHANGE THIS
   REGISTRY_HOST: "registry.gitlab.com" # CHANGE THIS
   REGISTRY_USER: "example@gmail.com" # CHANGE THIS
   ```

4. **Edit the image configuration to your own image**
   There are 3 images that must be change

   ```
   frontend:
       image: registry.gitlab.com/repository/frontend:latest # Update this
   backend:
       image: registry.gitlab.com/repository/backend:latest # Update this
   migration:
       image: registry.gitlab.com/repository/backend:latest # Update this
   ```

5. **Run `01-setup-docker.sh` this will install docker and init Docker Swarm**
   You might need to restart your terminal to make permission group work

   ```
   chmod +x 01-setup-docker.sh
   ./01-setup-docker.sh
   ```

6. **Run `02-app-setup.sh` to setup Docker secret and config automatically**

   ```
   chmod +x 02-app-setup.sh
   ./02-app-setup.sh
   ```

7. **Now login to your registry for docker with this commands**

   ```
   docker login <registry-url>
   ```

   For example docker login registry.gitlab.com

8. **Now run the deploy command**
   ```
   docker stack deploy -c docker-compose.yml <stack-name> --with-registry-auth
   ```

## Configuration

The config needs to be updated by yourself as it is not sync with config or secret

- Migration: `DB_TYPE`, `DB_HOST`, `DB_PORT`, `DB_NAME`
- Shepherd: `REGISTRY_HOST`, `REGISTRY_USER`
- Postgres: `POSTGRES_DB`

**VERY IMPORTANT** Docker swarm services will have a stack name as a prefix of each services. So match the host name of the service with its stack prefix

For example a service name postgres will ended up with `webapp_postgres` if your stack is named `webapp`

## Swarm config and secret requirement

This show a list config and secrets for each services

### Secrets

- shepherd : `shepherd_registry_password`
- postgres: `db_username_v1`, `db_password_v1`
- backend: `db_username_v1`, `db_password_v1`, `jwt_secret_v1`, `refresh_secret_v1`
- migration: `db_username_v1`, `db_password_v1`

### Configs

- backend: `backend_config_v1` configs

## Maintenance

To update Swarm Configs follow the instructions below

1. Update `backend.env` or `frontend.env` on the host.
2. Run these command (pick one)

- `docker config create <config-name> backend.env` for config
- `echo "my super secret password" | docker secret create <secret-name> -` for secret

3. Update `docker-compose.yml` to point to your `<secret-name>` or `config-name`.
4. Redeploy the stack.

   `docker stack deploy -c docker-compose.yml <stack-name> --with-registry-auth`

This apply to any config including secrets.

**Recommended secret name must end with v1, v2 or current date**
for example `backend_config_v1`, `backend_config_05032026`

### Database Migrations

Migrations are handled via a dedicated `migration` service within the Swarm. It executes `pnpm migration:run:prod` on startup. schema updates apply exactly once per image update.

## Deploy with Traefik (Optional)

**IMPORTANT** You must choose what you want to deploy with Traefik or Non-Traefik.

Non-Traefik expose 4000, 3000 and 5050 ports.

Traefik will closed the port and redirect incoming request to services and handle Let's Encrypt automatically

1. **Create docker network for Traefik**

   Traefik uses additional network to communicate with backend and frontend. So we must create an external network for it.

   ```
   docker network create -d overlay traefik-proxy
   ```

2. **Configure the traefik service**

   ```
   letsencrypt.acme.email=YOUR_EMAIL@EXAMPLE.COM" # UPDATE TO YOUR EMAIL
   ```

3. **Now we need to deploy our traefik stack**

   ```
   docker stack deploy -c traefik-compose.yml ingress
   ```

   ingress is the name of this stack you can change this to anything you want.

4. **Now lets deploy our web application**

   ```
   docker stack deploy -c docker-compose.traefik.yml <stack-name>
   ```

   Verify the traefik logs imemediately after deployment. If your DNS is incorrect or Let's Encrypt reject the request, it will show up here

   ```
   docker service logs ingress_traefik -f
   ```

Dashboard is disabled by default
ps. default user and password for dashboard is `admin` : `6kMN35QNbpqZ0rA5X0WJ`

### Generate user:password hash

```
htpasswd -nb admin yourpassword
```
