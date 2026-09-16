create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  tx_ref text,
  order_tracking_id text unique,
  merchant_reference text,
  email text,
  phone text,
  amount int default 20000,
  amount_usd decimal default 5.5,
  currency text default 'UGX',
  status text default 'pending',
  provider text default 'pesapal',
  created_at timestamptz default now()
);
alter table public.subscriptions enable row level security;
drop policy if exists "allow all" on public.subscriptions;
create policy "allow all" on public.subscriptions for all using (true) with check (true);
alter table public.profiles add column if not exists is_premium boolean default false;
alter table public.profiles add column if not exists premium_until timestamptz;
alter table public.subscriptions add column if not exists currency text default 'UGX';
alter table public.subscriptions add column if not exists amount_usd decimal;
notify pgrst, 'reload schema';
