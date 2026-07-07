"use client";

import { useEffect, useState } from "react";


type Service = {
  id: number;
  service_name: string;
};

type Props = {
  value: number | null;
  onChange: (id: number) => void;
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

      <label className="block text-sm font-semibold mb-2">
        Service
      </label>

      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="w-full rounded-xl border px-4 py-3"
      >
        <option value="">
          Select Service
        </option>

        {services.map((service) => (
          <option
            key={service.id}
            value={service.id}
          >
            {service.service_name}
          </option>
        ))}

      </select>

    </div>
  );
}