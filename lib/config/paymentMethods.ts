export const PAYMENT_METHODS = [
  "Cash",
  "M-Pesa",
  "Bank Transfer",
  "Cheque",
  "Visa",
  "MasterCard",
  "Corporate Credit",
] as const;

export const BILLING_TYPES = [
  {
    value: "CASH",
    label: "Cash Customer",
  },
  {
    value: "INVOICE",
    label: "Invoice Customer",
  },
] as const;

export const PAYMENT_TERMS = [
  "Immediate",
  "7 Days",
  "14 Days",
  "30 Days",
  "60 Days",
] as const;