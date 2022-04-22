export const getIdFromBase64 = (b64) => {
  if (!b64) return null;
  const parts = window.atob(b64).split(':');
  return parts && parts.length > 0 ? parts[1] : null;
};

export const colorHex = {
  light: '#feffef',
  primary: '#F9DE69',
  neutral: '#c4c4c4',
};
