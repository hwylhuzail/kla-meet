insert into storage.buckets (id, name, public) values ('photos', 'photos', true) on conflict (id) do nothing;
drop policy if exists "allow all" on storage.objects;
create policy "allow all" on storage.objects for all using (true) with check (true);
insert into storage.buckets (id, name, public) values ('verifications', 'verifications', false) on conflict (id) do nothing;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'verification owner access') then
    create policy "verification owner access" on storage.objects for all to authenticated using (bucket_id = 'verifications' and (storage.foldername(name))[1] = auth.uid()::text) with check (bucket_id = 'verifications' and (storage.foldername(name))[1] = auth.uid()::text);
  end if;
end $$;
alter table public.profiles add column if not exists photos text[] default '{}';
alter table public.profiles add column if not exists main_photo text;
alter table public.profiles add column if not exists is_verified boolean default false;
alter table public.profiles add column if not exists verification_status text default 'unverified';
alter table public.profiles add column if not exists id_type text;
alter table public.profiles add column if not exists verified_at timestamptz;
create table if not exists public.verifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  doc_type text not null,
  doc_front_url text not null,
  doc_back_url text not null,
  selfie_url text not null,
  status text default 'pending',
  auto_score int default 0,
  created_at timestamptz default now()
);
alter table public.verifications enable row level security;
drop policy if exists "allow all" on public.verifications;
create policy "allow all" on public.verifications for all using (true) with check (true);
notify pgrst, 'reload schema';
