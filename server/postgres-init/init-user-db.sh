#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
DO \$\$
BEGIN

    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles 
        WHERE rolname = '$POSTGRES_USER') THEN
        CREATE ROLE "$POSTGRES_USER" WITH LOGIN PASSWORD '$POSTGRES_PASSWORD';
    END IF;
    
END
\$\$;

CREATE DATABASE "$POSTGRES_NAME" OWNER "$POSTGRES_USER";

-- Grant privileges only if the database was created
GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_NAME" TO "$POSTGRES_USER";
EOSQL