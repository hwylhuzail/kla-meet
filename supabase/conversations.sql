create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  match_id uuid unique references matches(id) on delete cascade,
  user1 uuid not null,
  user2 uuid not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

alter table messages add column if not exists conversation_id uuid references conversations(id) on delete cascade;

alter table conversations enable row level security;
create policy "participants can read conversations" on conversations for select using (auth.uid() = user1 or auth.uid() = user2);
create policy "participants can create conversations" on conversations for insert with check (auth.uid() = user1 or auth.uid() = user2);
create policy "participants can update conversations" on conversations for update using (auth.uid() = user1 or auth.uid() = user2);

create policy "participants can read messages" on messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "sender can create messages" on messages for insert with check (auth.uid() = sender_id);
