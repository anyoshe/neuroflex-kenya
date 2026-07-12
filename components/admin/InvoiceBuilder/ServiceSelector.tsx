"use client";

import { useEffect, useState } from "react";


type Service = {
  id: number;
  service_name: string;
};

type Props = {
  value: number[];
  onChange: (ids: number[]) => void;
};
export default function ServiceSelector({
  value,
  onChange,
}: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
    const res = await fetch("/api/admin/service-catalog");

      const data = await res.json();

      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className="rounded-xl border p-4">
        Loading services...
      </div>
    );

  return (
    <div>
  <label className="block text-sm font-semibold mb-3">
    Services
  </label>

  <div className="space-y-2 rounded-xl border p-4 max-h-72 overflow-y-auto">

    {services.map((service) => {
      const checked = value.includes(service.id);

      return (
        <label
          key={service.id}
          className="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, service.id]);
              } else {
                onChange(
                  value.filter((id) => id !== service.id)
                );
              }
            }}
          />

          <span>{service.service_name}</span>
        </label>
      );
    })}

  </div>
</div>
  );
}