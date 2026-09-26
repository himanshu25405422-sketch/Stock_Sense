function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateProductPayload(body) {
  const errors = [];
  if (!body.name || body.name.trim() === '') errors.push('Product name is required');
  if (!body.sku || body.sku.trim() === '') errors.push('Product SKU is required');
  return errors;
}

module.exports = { validateEmail, validateProductPayload };
