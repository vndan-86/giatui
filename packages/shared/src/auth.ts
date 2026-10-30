import { createClient } from './supabaseClient';

export interface CurrentUserProfile {
  id: string;
  name: string;
  phone: string | null;
  company_id: string;
  role: {
    slug: string;
    name: string;
  };
  branches: {
    id: string;
    name: string;
    is_primary: boolean;
  }[];
}

export async function getCurrentUserProfile(): Promise<CurrentUserProfile | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select(`
      id,
      name,
      phone,
      company_id,
      roles (slug, name),
      user_branch_access (
        is_primary,
        branches (id, name)
      )
    `)
    .eq('id', user.id)
    .single();

  if (error || !profile) return null;

  const rawRole = profile.roles as unknown as { slug: string; name: string };
  const rawAccess = (profile.user_branch_access || []) as unknown as {
    is_primary: boolean;
    branches: { id: string; name: string };
  }[];

  return {
    id: profile.id,
    name: profile.name,
    phone: profile.phone,
    company_id: profile.company_id,
    role: rawRole,
    branches: rawAccess.map(item => ({
      id: item.branches.id,
      name: item.branches.name,
      is_primary: item.is_primary
    }))
  };
}
