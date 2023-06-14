export const nameExtractor = (mail?: string | null) => {
  return mail?.split(".")[0] ?? null;
};
