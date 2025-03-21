create table todos (
  id uuid default gen_random_uuid() primary key,
  -- user_id uuid references auth.users not null,
  text text not null check (length(trim(text)) > 0),
  done boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted boolean default false -- needed for soft deletes
);
-- alter table todos enable row level security;
-- create policy "Individuals can create todos." on todos for
--     insert with check (auth.uid() = user_id);
-- create policy "Individuals can view their own todos. " on todos for
--     select using ((select auth.uid()) = user_id);
-- create policy "Individuals can update their own todos." on todos for
--     update using ((select auth.uid()) = user_id);
-- create policy "Individuals can delete their own todos." on todos for
--     delete using ((select auth.uid()) = user_id);

-- Enable realtime
alter
  publication supabase_realtime add table todos;


-- This will set the `created_at` column on create and `updated_at` column on every update
CREATE OR REPLACE FUNCTION handle_times()
    RETURNS trigger AS
    $$
    BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSEIF (TG_OP = 'UPDATE') THEN
        NEW.created_at = OLD.created_at;
        NEW.updated_at = now();
    END IF;
    RETURN NEW;
    END;
    $$ language plpgsql;

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON todos
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();