"use client";

import { Quotation } from "@/src/components/vendor";

export default function QuotationPage() {
  const handleAddWorkItem = () => {
    console.log("Add work item");
  };

  const handleAddMaterial = () => {
    console.log("Add material");
  };

  const handleAddAdditionalWork = () => {
    console.log("Add additional work");
  };

  const handleSendQuotation = () => {
    console.log("Send quotation");
  };

  const handleChange = (field: string, value: string) => {
    console.log("Field changed:", field, value);
  };

  return (
    <Quotation
      onAddWorkItem={handleAddWorkItem}
      onAddMaterial={handleAddMaterial}
      onAddAdditionalWork={handleAddAdditionalWork}
      onSendQuotation={handleSendQuotation}
      onChange={handleChange}
    />
  );
}
