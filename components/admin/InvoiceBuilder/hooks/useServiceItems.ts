import { useEffect, useState } from "react";

export type InvoiceItem = {
  id: number;
  item_code: string;
  description: string;

  quantity: number;
  unitPrice: number;

  editable: boolean;
};

  export function useServiceItems(serviceIds: number[]) {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (serviceIds.length === 0) {
    setItems([]);
    return;
  }

  loadItems();
}, [serviceIds]);

async function loadItems() {
  setLoading(true);

  try {
    const responses = await Promise.all(
      serviceIds.map((id) =>
        fetch(`/api/service-items/${id}`).then((res) => res.json())
      )
    );

    // Flatten all service items
    const allItems = responses.flat();

    // Remove duplicates (optional but recommended)
    const uniqueItems = Array.from(
      new Map(allItems.map((item: any) => [item.id, item])).values()
    );

    const invoiceItems: InvoiceItem[] = uniqueItems.map((item: any) => ({
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