-- Create tables
create table public.products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  price numeric not null,
  dimensions_label text not null,
  width_cm numeric not null,
  length_cm numeric not null,
  category text not null,
  colors text[] default '{}',
  image_url text not null,
  model_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.analytics (
  id uuid default gen_random_uuid() primary key,
  event_type text not null check (event_type in ('view_product', 'start_ar', 'fallback_2d', 'share')),
  product_id uuid references public.products(id),
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;
alter table public.analytics enable row level security;

-- Policies (Public Read for Products)
create policy "Allow public read access" on public.products for select using (true);

-- Policies (Public Insert for Analytics)
create policy "Allow public analytics insert" on public.analytics for insert with check (true);

-- Policies (Admin Auth required for Product Insert/Update/Delete) - placeholder for now, assuming authenticated role
create policy "Allow authenticated insert" on public.products for insert to authenticated with check (true);
create policy "Allow authenticated update" on public.products for update to authenticated using (true);

-- Seed Data (Mock Products)
insert into public.products (title, slug, price, dimensions_label, width_cm, length_cm, category, colors, image_url, model_url)
values
('The Imperial Oushak', 'imperial-oushak', 2450.00, '8'' x 10''', 244, 305, 'Traditional', ARRAY['Beige', 'Gold', 'Blue'], 'https://images.unsplash.com/photo-1596489391054-d830b9101d2a?q=80&w=1200&auto=format&fit=crop', null),
('Modern Geometric Wool', 'modern-geometric-wool', 1200.00, '5'' x 8''', 152, 244, 'Modern', ARRAY['Grey', 'White', 'Black'], 'https://images.unsplash.com/photo-1575909812264-5d5184b23528?q=80&w=1200&auto=format&fit=crop', null),
('Vintage Distressed Runner', 'vintage-distressed-runner', 850.00, '2.5'' x 9''', 76, 274, 'Vintage', ARRAY['Red', 'Naviy', 'Cream'], 'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1200&auto=format&fit=crop', null),
('Silk Kashan Hand-Knotted', 'silk-kashan', 4500.00, '9'' x 12''', 274, 366, 'Luxury', ARRAY['Emerald', 'Gold'], 'https://images.unsplash.com/photo-1563725586618-68f7dc3b91bc?q=80&w=1200&auto=format&fit=crop', null);
