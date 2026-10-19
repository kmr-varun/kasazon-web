"use client";

import { JobRequestCard, type JobRequest } from "./JobRequestCard";

interface JobRequestsGridProps {
  jobs?: JobRequest[];
  onAccept?: (jobId: string) => void;
  onDecline?: (jobId: string) => void;
  onDetails?: (jobId: string) => void;
}

const defaultJobs: JobRequest[] = [
  {
    id: "1",
    jobId: "#KB 12345",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "2",
    jobId: "#KB 12346",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "3",
    jobId: "#KB 12347",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "4",
    jobId: "#KB 12348",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "5",
    jobId: "#KB 12349",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "6",
    jobId: "#KB 12350",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "7",
    jobId: "#KB 12351",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "8",
    jobId: "#KB 12352",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
  {
    id: "9",
    jobId: "#KB 12353",
    title: "Home Cleaning",
    price: 60.00,
    customerName: "Kofi Asante",
    distance: "1.8 Km Away",
    time: "1:20pm",
  },
];

export function JobRequestsGrid({
  jobs = defaultJobs,
  onAccept,
  onDecline,
  onDetails,
}: JobRequestsGridProps) {
  return (
    <div className="py-4">
      <div className="grid grid-cols-3 gap-3 px-4">
        {jobs.map((job) => (
          <JobRequestCard
            key={job.id}
            job={job}
            onAccept={onAccept}
            onDecline={onDecline}
            onDetails={onDetails}
          />
        ))}
      </div>
    </div>
  );
}
