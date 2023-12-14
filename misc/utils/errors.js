export const parseRequestErrors = (data) => {
  const errors = [];
  if (typeof data === "string") {
    errors.push(data);
    return errors;
  }
  if (data.message && typeof data.message === 'string') {
    errors.push(data.message);
    return errors;
  }
  if (data.errors && typeof data.errors === 'object') {
    Object.values(data.errors).forEach((list) => {
      if (!Array.isArray(list)) return;
      list.forEach((error) => {
        if (!error) return;
        errors.push(error);
      });
    });
  }
  return errors;
}
