create table profiles (id uuid primary key default gen_random_uuid(), email text, phone text, name text, bio text, age int check (age>=18), gender text, location text default 'Kampala', photos text[], is_premium boolean default false, created_at timestamp default now());
create table messages (id uuid primary key default gen_random_uuid(), sender_id uuid, receiver_id uuid, text text, media_url text, media_type text, created_at timestamp default now());
create table likes (id uuid primary key default gen_random_uuid(), from_id uuid, to_id uuid, created_at timestamp default now());
create table matches (id uuid primary key default gen_random_uuid(), user1 uuid, user2 uuid, created_at timestamp default now());
create table subscriptions (id uuid primary key default gen_random_uuid(), user_id uuid, plan text, status text, tracking_id text, amount int, provider text, created_at timestamp default now());
alter table profiles enable row level security;
alter table messages enable row level security;
create policy "public read" on profiles for select using (true);
create policy "own write" on profiles for all using (auth.uid() = id);
