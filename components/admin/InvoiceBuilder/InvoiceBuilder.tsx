"use client";
import { useState, useEffect } from "react";
import PatientDetails from "./PatientDetails";
import Diagnosis from "./Diagnosis";
import InvoiceItems from "./InvoiceItems";
import CustomerInformation from "./CustomerInformation";
import ServiceSelector from "./ServiceSelector";
import { useServiceItems } from "./hooks/useServiceItems";
import PaymentSummary from "./PaymentSummary";
import PaymentInformation from "./PaymentInformation";
import { useInvoiceTotals } from "./hooks/useInvoiceTotals";
import SaveInvoiceButton from "./SaveInvoiceButton";


type Props = {

  open: boolean;
  report: any;
  onClose: () => void;
};

export default function InvoiceBuilder({
  open,
  report,
  onClose,
}: Props) {

  const [serviceId, setServiceId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const {
    items,
    setItems,
    loading,
  } = useServiceItems(serviceId);

  const invoiceNo = "NINV-0001";


  const [invoiceData, setInvoiceData] = useState({

    diagnosis: "",

    customerType: "PRIVATE",

    organization: "",

    contactPerson: "",

    insuranceCompany: "",

    policyNumber: "",

    authorizationNumber: "",

    billingType: "CASH",

    paymentMethod: "Cash",

    paymentTerms: "Immediate",

    referenceNumber: "",

    vatRate: 0,

    amountPaid: 0,

    discount: 0,

    notes: "",

  });
  const {
  subtotal,
  discountAmount,
  taxableAmount,
  vatAmount,
  grandTotal,
  balance,
} = useInvoiceTotals({
  items,
  discount: invoiceData.discount,
  vatRate: invoiceData.vatRate,
  amountPaid: invoiceData.amountPaid,
});

  async function saveInvoice() {

  if (!serviceId) {

    alert("Select a service.");

    return;

  }

  setSaving(true);

  try {

    const res = await fetch("/api/invoices", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        reportId: report.id,

        serviceId,

        customerType: invoiceData.customerType,

        organization: invoiceData.organization,

        contactPerson: invoiceData.contactPerson,

        insuranceCompany: invoiceData.insuranceCompany,

        policyNumber: invoiceData.policyNumber,

        authorizationNumber: invoiceData.authorizationNumber,

        billingType: invoiceData.billingType,

        paymentMethod: invoiceData.paymentMethod,

        paymentTerms: invoiceData.paymentTerms,

        subtotal,

        discount: invoiceData.discount,

        vatRate: invoiceData.vatRate,

        vatAmount,

        total: grandTotal,

        amountPaid: invoiceData.amountPaid,

        balance,

        diagnosis: invoiceData.diagnosis,

        notes: invoiceData.notes,

        createdBy: "Admin",

        items,

      }),

    });

    const data = await res.json();

    if (!data.success) {

      throw new Error(data.message);

    }

    alert(`Invoice ${data.invoiceNo} created successfully.`);

    onClose();

  } catch (err) {

    console.error(err);

    alert("Failed to save invoice.");

  } finally {

    setSaving(false);

  }

}
  useEffect(() => {
    if (!report) return;

    setInvoiceData((prev) => ({
      ...prev,
      diagnosis: report.assessment_findings ?? "",
    }));
  }, [report]);
  if (!open || !report) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-auto">

        {/* Header */}

        <div className="border-b px-8 py-6 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-brand-navy">
              New Invoice
            </h2>

            <p className="text-brand-green mt-1">
              Generate invoice from assessment report
            </p>

          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border hover:bg-gray-100"
          >
            Close
          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-8">

          {/* Patient Information */}

          <PatientDetails
            report={report}
            invoiceNo={invoiceNo}
          />
          <Diagnosis
            diagnosis={invoiceData.diagnosis}
            setDiagnosis={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                diagnosis: value,
              }))
            }
          />
          <ServiceSelector
            value={serviceId}
            onChange={setServiceId}
          />

          {/* Customer Information */}
          <CustomerInformation
            customerType={invoiceData.customerType}
            setCustomerType={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                customerType: value,
              }))
            }

            organization={invoiceData.organization}
            setOrganization={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                organization: value,
              }))
            }

            contactPerson={invoiceData.contactPerson}
            setContactPerson={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                contactPerson: value,
              }))
            }

            insuranceCompany={invoiceData.insuranceCompany}
            setInsuranceCompany={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                insuranceCompany: value,
              }))
            }

            policyNumber={invoiceData.policyNumber}
            setPolicyNumber={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                policyNumber: value,
              }))
            }

            authorizationNumber={invoiceData.authorizationNumber}
            setAuthorizationNumber={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                authorizationNumber: value,
              }))
            }
          />
          <InvoiceItems
            items={items}
            setItems={setItems}
          />

          <PaymentSummary
            items={items}
            discount={invoiceData.discount}
            setDiscount={(value) =>
              setInvoiceData(prev => ({
                ...prev,
                discount: value,
              }))
            }

            vatRate={invoiceData.vatRate}
            setVatRate={(value) =>
              setInvoiceData(prev => ({
                ...prev,
                vatRate: value,
              }))
            }
          />
          <PaymentInformation
            billingType={invoiceData.billingType}
            setBillingType={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                billingType: value,
              }))
            }

            paymentMethod={invoiceData.paymentMethod}
            setPaymentMethod={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                paymentMethod: value,
              }))
            }

            paymentTerms={invoiceData.paymentTerms}
            setPaymentTerms={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                paymentTerms: value,
              }))
            }

            referenceNumber={invoiceData.referenceNumber}
            setReferenceNumber={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                referenceNumber: value,
              }))
            }

            amountPaid={invoiceData.amountPaid}
            setAmountPaid={(value) =>
              setInvoiceData((prev) => ({
                ...prev,
                amountPaid: value,
              }))
            }

            total={grandTotal}
          />
          <SaveInvoiceButton
    saving={saving}
    onSave={saveInvoice}
/>
        </div>

      </div>

    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div>

      <p className="text-xs uppercase text-brand-green font-semibold">
        {label}
      </p>

      <div className="mt-1 rounded-xl border bg-gray-50 px-4 py-3">
        {value || "-"}
      </div>

    </div>
  );
}