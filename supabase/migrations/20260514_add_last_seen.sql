-- Agrega la columna last_seen a user_session_data para el sistema de heartbeat de presencia.
-- Ejecutar en el SQL Editor de Supabase: https://supabase.com/dashboard/project/_/sql
ALTER TABLE user_session_data
  ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ;
