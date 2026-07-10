"use client";

import { Plus, Trash2 } from "lucide-react";

type InvoiceItem = {
  id: number;
  item_code: string;

  description: string;

  quantity: number;

  unitPrice: number;

  editable: boolean;
}

type Props = {
  items: InvoiceItem[];
  setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
};

export default function InvoiceItems({
  items,
  setItems,
}: Props) {

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
            ...item,
            [field]: value,
          }
          : item
      )
    );
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const addItem = () => {
  setItems((prev) => [
    ...prev,
    {
      id: 0,
      item_code: "CUSTOM",
      description: "",
      quantity: 1,
      unitPrice: 0,
      editable: true,
    },
  ]);
};

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity) *
      Number(item.unitPrice),
    0
  );

  return (
    <div className="rounded-2xl border bg-white">

      <div className="border-b px-6 py-4">

        <h3 className="text-xl font-bold text-brand-navy">
          Invoice Items
        </h3>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-4 py-3 text-left">
                Qty
              </th>

              <th className="px-4 py-3 text-left">
                Description
              </th>

              <th className="px-4 py-3 text-right">
                Unit Price
              </th>

              <th className="px-4 py-3 text-right">
                Total
              </th>

              <th className="w-16"></th>

            </tr>

          </thead>

          <tbody>

            {items.map((item, index) => {

              const total =
                Number(item.quantity) *
                Number(item.unitPrice);
              return (

                <tr
                  key={item.id}
                  className="border-t"
                >

                  <td className="p-3">

                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className="w-20 rounded-lg border px-2 py-2"
                    />

                  </td>

                  <td className="p-3">

                    <input
                      value={item.description}
                      disabled={!item.editable}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border px-3 py-2 disabled:bg-gray-100"
                    />

                  </td>

                  <td className="p-3">

                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "unitPrice",
                          Number(e.target.value)
                        )
                      }
                      className="w-36 rounded-lg border px-3 py-2 text-right"
                    />

                  </td>

                  <td className="p-3 text-right font-semibold">

                    {total.toLocaleString()}

                  </td>

                  <td className="p-3 text-center">

                    <button
                      onClick={() => removeItem(index)}
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      <div className="border-t p-4 flex justify-between">

        <button
          onClick={addItem}
          className="flex items-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-white"
        >
          <Plus size={18} />

          Add Custom Item

        </button>

        <div className="text-right">

          <p className="text-gray-500">
            Subtotal
          </p>

          <p className="text-2xl font-bold text-brand-navy">

            KSh {subtotal.toLocaleString()}

          </p>

        </div>

      </div>

    </div>
  );
}