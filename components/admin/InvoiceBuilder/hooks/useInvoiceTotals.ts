import type { InvoiceItem } from "./useServiceItems";
type Item = InvoiceItem;

type Props = {
  items: Item[];
  vatRate: number;
  discount: number;
};

export function useInvoiceTotals({
  items,
  vatRate,
  discount,
}: Props) {

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity) *
      Number(item.unitPrice),
    0
  );

  const discountAmount = Number(discount);

  const taxableAmount =
    subtotal - discountAmount;

  const vatAmount =
    taxableAmount * (Number(vatRate) / 100);

  const grandTotal =
    taxableAmount + vatAmount;

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    vatAmount,
    grandTotal,
  };
}