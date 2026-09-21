-- KLA Meet international discovery and safety upgrade.
-- Run after the original tables.sql. Every statement is idempotent.
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists country_code text;
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists relationship_intention text;
alter table public.profiles add column if not exists languages text[] default '{}';
alter table public.profiles add column if not exists interests text[] default '{}';
alter table public.profiles add column if not exists occupation text;
alter table public.profiles add column if not exists education text;
alter table public.profiles add column if not exists last_seen_at timestamptz;
alter table public.profiles add column if not exists is_online boolean default false;
alter table public.profiles add column if not exists is_verified boolean default false;
alter table public.profiles add column if not exists profile_video_url text;

create table if not exists public.profile_photos (id uuid primary key default gen_random_uuid(), user_id uuid not null references public.profiles(id) on delete cascade, url text not null, position int default 0, created_at timestamptz default now());
create table if not exists public.reports (id uuid primary key default gen_random_uuid(), reporter_id uuid not null references auth.users(id) on delete cascade, reported_user_id uuid not null references public.profiles(id) on delete cascade, reason text not null, details text, status text default 'open', created_at timestamptz default now());
create table if not exists public.blocks (id uuid primary key default gen_random_uuid(), blocker_id uuid not null references auth.users(id) on delete cascade, blocked_user_id uuid not null references public.profiles(id) on delete cascade, created_at timestamptz default now(), unique(blocker_id, blocked_user_id));
create table if not exists public.user_preferences (user_id uuid primary key references auth.users(id) on delete cascade, preferred_country text, preferred_gender text, min_age int default 18, max_age int default 99, worldwide boolean default true, updated_at timestamptz default now());

create index if not exists profiles_country_code_idx on public.profiles(country_code);
create index if not exists profiles_last_seen_idx on public.profiles(last_seen_at desc);
create index if not exists profiles_created_at_idx on public.profiles(created_at desc);

alter table public.profile_photos enable row level security;
alter table public.reports enable row level security;
alter table public.blocks enable row level security;
alter table public.user_preferences enable row level security;
do $$ begin
	if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profile_photos' and policyname = 'profile photos are public to signed-in users') then
		create policy "profile photos are public to signed-in users" on public.profile_photos for select to authenticated using (true);
	end if;
	if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profile_photos' and policyname = 'users manage own profile photos') then
		create policy "users manage own profile photos" on public.profile_photos for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
	end if;
	if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'reports' and policyname = 'users create reports') then
		create policy "users create reports" on public.reports for insert to authenticated with check (auth.uid() = reporter_id);
	end if;
	if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'blocks' and policyname = 'users manage own blocks') then
		create policy "users manage own blocks" on public.blocks for all to authenticated using (auth.uid() = blocker_id) with check (auth.uid() = blocker_id);
	end if;
	if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_preferences' and policyname = 'users manage own preferences') then
		create policy "users manage own preferences" on public.user_preferences for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
	end if;
end $$;
