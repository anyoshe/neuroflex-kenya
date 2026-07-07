import { useEffect, useState } from "react";

export type InvoiceItem = {
  id: number;
  item_code: string;
  description: string;

  quantity: number;
  unitPrice: number;

  editable: boolean;
};

export function useServiceItems(serviceId: number | null) {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!serviceId) {
      setItems([]);
      return;
    }

    loadItems();
  }, [serviceId]);

  async function loadItems() {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/service-items/${serviceId}`
      );

      const data = await res.json();

      const invoiceItems: InvoiceItem[] = data.map((item: any) => ({
        id: item.id,
        item_code: item.item_code,
        description: item.description,

        quantity: Number(item.default_quantity),

        unitPrice: Number(item.unit_price),

        editable: item.editable,
      }));

      setItems(invoiceItems);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    items,
    setItems,
    loading,
  };
}