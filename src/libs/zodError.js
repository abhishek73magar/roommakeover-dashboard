export const zodError = (errors, name) => {
  const error = errors[name]
  if(error) return error.message;
  return null;
}