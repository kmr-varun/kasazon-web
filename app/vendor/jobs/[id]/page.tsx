"use client";

import { useState } from "react";
import { JobRequestDetail, JobAcceptedModal } from "@/src/components/vendor";

export default function JobRequestDetailPage() {
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);

  const handleAccept = () => {
    setShowAcceptedModal(true);
  };

  return (
    <>
      <JobRequestDetail onAccept={handleAccept} />
      <JobAcceptedModal
        isOpen={showAcceptedModal}
        onClose={() => setShowAcceptedModal(false)}
      />
    </>
  );
}
