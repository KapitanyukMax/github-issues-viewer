export function getAccessTokenFromRequest(req: Request): string | undefined {
  const authHeader = req.headers.get('Authorization');
  return authHeader?.split(' ')[1];
}
