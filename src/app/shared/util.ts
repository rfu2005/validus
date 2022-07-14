export const getClass = (sortInfo: Array<string>, columnName: string) => {
  const [column, ord] = sortInfo;
  if (column !== columnName) return '';
  if (ord === 'asc') return 'up';
  return 'down';
};
