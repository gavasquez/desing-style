export const truncateDescription = (text: string, maxLength: number = 1000) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
