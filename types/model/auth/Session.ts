export interface Session {
  id: number;
  user_id: number | null;
  session_token: string | null;
  created_at: Date | null;
  expires_at: Date;
}
