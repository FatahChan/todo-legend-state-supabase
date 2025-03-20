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
    
    -- Insert default todos
    INSERT INTO todos (text, done, id) VALUES
    (''Buy groceries'', false, ''194c94ea-8330-4c9a-8ca7-0da2ef5c2e30''),
    (''Complete project documentation'', true, ''1cbaf32b-ee46-42c8-b6d6-0b7bacbcda61''),
    (''Schedule dentist appointment'', false, ''211dfbd4-b34d-45b9-8e76-2dfbd329b999''),
    (''Review pull requests'', true, ''44fba803-d2ea-4451-a844-9a2389df19e1''),
    (''Learn Supabase'', false, ''583d8844-f670-4ad3-9b78-e3d3aa63a2aa''),
    (''Update dependencies'', false, ''6b707c0b-f665-47ea-a438-91760ab4eb3d''),
    (''Write unit tests'', false, ''6ed495ee-3e39-4b51-acd8-483246a39b54''),
    (''Plan team meeting'', true, ''8622fa10-a23c-4e91-a0ad-8fd8e0eda478''),
    (''Setup CI/CD pipeline'', false,''cb27cd6c-d5e0-43af-977a-98adb112c8c7''),
    (''Backup database'', false, ''f11c5840-0b98-4ae4-984f-4e001e2ad7ff'');'
);
