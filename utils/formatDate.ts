export const formatDate = (value: any): string => {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('ja-JP');
};

export const formatDateTime = (value: any): string => {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};