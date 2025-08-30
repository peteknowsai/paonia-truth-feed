// Admin configuration
export const ADMIN_EMAILS = ['petefromsf@gmail.com'];

export function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}