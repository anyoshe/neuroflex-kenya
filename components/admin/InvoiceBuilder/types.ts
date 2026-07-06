export type InvoiceItem = {
  id: string;
  service: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export type InvoiceData = {
  invoiceNo: string;
  reportNo: string;
  patientName: string;
  age: number;
  sex: string;
  telephone: string;
  residence: string;

  diagnosis: string;

  treatmentFrom: string;
  treatmentTo: string;

  items: InvoiceItem[];

  subtotal: number;
  discount: number;
  total: number;
  amountPaid: number;
  balance: number;

  paymentMethod: string;
  transactionRef: string;

  notes: string;

  createdBy: string;
};