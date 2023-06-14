export const isAdmin = (user?: string) => {
  return user === process.env.NEXT_PUBLIC_ADMIN_UID;
};
