export const cutText = (text: string, nb: number) => {
  if (!text || text.length === 0) {
    return "";
  }
  const n = nb;
  if (text.length <= n) {
    return text;
  }
  const cut = text.substring(0, n) + "...";

  return cut;
};
