alter table public.profiles add column if not exists live_photos text[] default '{}';
alter table public.profiles add column if not exists live_photo_url text;
alter table public.profiles add column if not exists live_photos_verified boolean default false;
alter table public.profiles add column if not exists verification_status text default 'unverified';
alter table public.profiles add column if not exists verification_selfie_url text;
alter table public.profiles add column if not exists is_verified boolean default false;
insert into storage.buckets (id, name, public) values ('profile-pics', 'profile-pics', true) on conflict (id) do update set public = true;
do $$ begin
	if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'profile pics are publicly readable') then
		create policy "profile pics are publicly readable" on storage.objects for select using (bucket_id = 'profile-pics');
	end if;
	if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'users upload profile pics') then
		create policy "users upload profile pics" on storage.objects for insert to authenticated with check (bucket_id = 'profile-pics' and (storage.foldername(name))[1] = auth.uid()::text);
	end if;
	if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'users update profile pics') then
		create policy "users update profile pics" on storage.objects for update to authenticated using (bucket_id = 'profile-pics' and (storage.foldername(name))[1] = auth.uid()::text);
	end if;
end $$;
notify pgrst, 'reload schema';
