// Only display formatting lives on the client now. The actual amount is
// always computed and verified on the backend (see server/src/utils/pricing.js) —
// nothing here is trusted for a real charge.

export function formatCurrency(amount, currency = "EGP") {
  const rounded = Math.round((amount + Number.EPSILON) * 100) / 100;
  return `${currency} ${rounded.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Client-side ESTIMATE only, shown before checkout starts so the user has
 * an idea of the total. The backend recomputes this independently and its
 * number is what's actually charged and shown on the confirmation screen.
 */
export function estimateTotals(pricing, promo) {
  const pitchFee = pricing?.pitchFee ?? 0;
  const serviceFee = pricing?.serviceFee ?? 0;
  const taxRate = pricing?.taxRate ?? 0;
  const subtotal = pitchFee + serviceFee;

  let discount = 0;
  if (promo) {
    discount = promo.type === "percent" ? (subtotal * promo.value) / 100 : Math.min(promo.value, subtotal);
  }

  const discountedSubtotal = Math.max(subtotal - discount, 0);
  const tax = discountedSubtotal * taxRate;
  const total = discountedSubtotal + tax;

  return { pitchFee, serviceFee, discount, tax, total };
}
