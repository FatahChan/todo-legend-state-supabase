-- Enable the pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

grant select on table "cron"."job" to "postgres";

grant delete on table "cron"."job_run_details" to "postgres";

grant insert on table "cron"."job_run_details" to "postgres";

grant references on table "cron"."job_run_details" to "postgres";

grant select on table "cron"."job_run_details" to "postgres";

grant trigger on table "cron"."job_run_details" to "postgres";

grant truncate on table "cron"."job_run_details" to "postgres";

grant update on table "cron"."job_run_details" to "postgres";


-- Schedule the cron job to run every 30 minutes
SELECT cron.schedule(
    'reset-todos-30min',  -- job name
    '*/30 * * * *',      -- cron expression: Every 30 seconds
    '    
    -- Delete all existing todos
    DELETE FROM todos;
    
    -- Reset the counter sequence
    ALTER SEQUENCE todos_counter_seq RESTART WITH 1;
    
    -- Insert default todos
    INSERT INTO todos (text, done) VALUES
    (''Buy groceries'', false),
    (''Complete project documentation'', true),
    (''Schedule dentist appointment'', false),
    (''Review pull requests'', true),
    (''Learn Supabase'', false),
    (''Update dependencies'', false),
    (''Write unit tests'', false),
    (''Plan team meeting'', true),
    (''Setup CI/CD pipeline'', false),
    (''Backup database'', false);'
);
