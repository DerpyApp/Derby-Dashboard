// Validation for the Information step. Card details are never collected or
// validated here — Paymob's hosted checkout handles that entirely.

export function isNonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidFullName(value) {
  return isNonEmpty(value) && value.trim().length >= 2;
}

export function isValidEmail(value) {
  if (!isNonEmpty(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value) {
  if (!isNonEmpty(value)) return false;
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
