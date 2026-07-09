#!/bin/bash
set -e

echo "Application Environment Setup"

BASE_DIR="$(pwd)/data"
BACKEND_DIR="$BASE_DIR/files"
DB_DIR="$BASE_DIR/pg_data"

BACK_ENV="$(pwd)/backend.env"

if [[ -f ".env" ]]; then
  source ".env"
else
  echo "Error: .env file not found. Please create one before running this script."
  exit 1
fi

if [[ ! -f "$BACK_ENV" ]]; then
  echo "Error: backend.env file not found at $BACK_ENV"
  exit 1
fi

echo "1. Configuring Bind Mounts Directory"
mkdir -p "$BASE_DIR/files" "$BASE_DIR/pg_data"
sudo chown -R 70:70 "$BASE_DIR/pg_data" && sudo chmod 700 "$BASE_DIR/pg_data"
sudo chown -R 1000:1000 "$BASE_DIR/files" && sudo chmod 760 "$BASE_DIR/files"

echo "2. Loading Swarm Configs..."
# Creates configs if they don't exist yet
docker config inspect backend_config_v1 >/dev/null 2>&1 || docker config create backend_config_v1 "$BACK_ENV"

# ─── Helper ───────────────────────────────────────────────────
_create_secret() {
  local name=$1 value=$2
  docker secret inspect "$name" >/dev/null 2>&1 \
    || echo "$value" | docker secret create "$name" -
}

echo "3. Initializing Swarm Secrets..."
_create_secret db_username_v1             "${POSTGRES_USERNAME:?Must set POSTGRES_USERNAME}"
_create_secret db_password_v1             "${POSTGRES_PASSWORD:?Must set POSTGRES_PASSWORD}"
_create_secret jwt_secret_v1              "${JWT_SECRET:?Must set JWT_SECRET}"
_create_secret refresh_secret_v1          "${REFRESH_SECRET:?Must set REFRESH_SECRET}"
_create_secret shepherd_registry_password "${GITLAB_TOKEN:?Must set GITLAB_TOKEN}"
_create_secret pgadmin_password           "${PGADMIN_PASSWORD:?Must set PGADMIN_PASSWORD}"

 
echo "Application Environment Ready."
echo "Please use 'docker stack deploy -c docker-compose.yml <stack-name> --with-registry-auth' to deploy"