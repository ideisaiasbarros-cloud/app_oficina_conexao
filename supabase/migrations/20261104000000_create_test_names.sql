create table if not exists public.test_names (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  created_at timestamptz not null default now()
);

alter table public.test_names enable row level security;

grant insert on table public.test_names to anon;

create policy "Allow anonymous name inserts for demo"
on public.test_names
for insert
to anon
with check (char_length(btrim(name)) between 1 and 120);
