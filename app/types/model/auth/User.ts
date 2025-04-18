export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: Date | null;
  role_id: number | null;
}

export interface UserWithRole {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: Date | null;
  role_id: number | null;
  role: {
    id: number;
    name: string;
  } | null;
}
