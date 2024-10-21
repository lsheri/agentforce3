export function validateFormData(formData) {
  const errors = [];

  // Check if at least one field has a value
  const hasValue = Object.values(formData).some(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== '' && value !== undefined;
  });

  if (!hasValue) {
    errors.push('Please provide at least one input');
  }

  return errors;
}