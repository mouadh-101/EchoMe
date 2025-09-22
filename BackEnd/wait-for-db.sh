#!/bin/sh
# wait-for-db.sh

set -e

host="$1"
shift
cmd="$@"

echo "Waiting for database at $host..."

until PGPASSWORD=$DB_PASSWORD psql -h "$host" -U "$DB_USER" -d "$DB_DATABASE" -c '\q'; do
  >&2 echo "Database is unavailable - sleeping"
  sleep 2
done

>&2 echo "Database is up - executing command"
exec $cmd
