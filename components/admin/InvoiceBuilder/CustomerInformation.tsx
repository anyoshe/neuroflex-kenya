type Props = {
  customerType: string;
  setCustomerType: (value: string) => void;

  organization: string;
  setOrganization: (value: string) => void;

  contactPerson: string;
  setContactPerson: (value: string) => void;

  insuranceCompany: string;
  setInsuranceCompany: (value: string) => void;

  policyNumber: string;
  setPolicyNumber: (value: string) => void;

  authorizationNumber: string;
  setAuthorizationNumber: (value: string) => void;
};

export default function CustomerInformation({
  customerType,
  setCustomerType,
  organization,
  setOrganization,
  contactPerson,
  setContactPerson,
  insuranceCompany,
  setInsuranceCompany,
  policyNumber,
  setPolicyNumber,
  authorizationNumber,
  setAuthorizationNumber,
}: Props) {
  return (
    <div className="space-y-6">

      <h3 className="text-lg font-bold text-brand-navy">
        Customer Information
      </h3>

      <div>
        <label className="block mb-2 font-medium">
          Customer Type
        </label>

        <select
          value={customerType}
          onChange={(e) =>
            setCustomerType(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        >
          <option value="PRIVATE">
            Private / Self Pay
          </option>

          <option value="CORPORATE">
            Corporate
          </option>

          <option value="INSURANCE">
            Insurance
          </option>
        </select>
      </div>

      {customerType === "CORPORATE" && (
        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="block mb-2">
              Organization
            </label>

            <input
              value={organization}
              onChange={(e) =>
                setOrganization(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Contact Person
            </label>

            <input
              value={contactPerson}
              onChange={(e) =>
                setContactPerson(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

        </div>
      )}

      {customerType === "INSURANCE" && (
        <div className="grid md:grid-cols-3 gap-5">

          <div>

            <label className="block mb-2">
              Insurance Company
            </label>

            <input
              value={insuranceCompany}
              onChange={(e) =>
                setInsuranceCompany(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Policy Number
            </label>

            <input
              value={policyNumber}
              onChange={(e) =>
                setPolicyNumber(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="block mb-2">
              Authorization Number
            </label>

            <input
              value={authorizationNumber}
              onChange={(e) =>
                setAuthorizationNumber(
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

        </div>
      )}

    </div>
  );
}