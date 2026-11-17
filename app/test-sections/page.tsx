'use client';

import { ServiceCategoryPills, ServiceFilterSort } from "@/src/components/sections";

export default function TestSectionsPage() {
  const serviceCategories = [
    { id: 'ac-service', label: 'AC Service', icon: '/images/services/ac-service-icon.svg' },
    { id: 'repair', label: 'Repair & Gas Refill', icon: '/images/services/repair-icon.svg' },
    { id: 'installation', label: 'Installation', icon: '/images/services/installation-icon.svg' },
    { id: 'uninstallation', label: 'Uninstallation', icon: '/images/services/uninstallation-icon.svg' },
    { id: 'maintenance', label: 'AC Maintenance', icon: '/images/services/maintenance-icon.svg' },
  ];

  const filters = {
    serviceType: [
      { id: 'all', label: 'All Services' },
      { id: 'cleaning', label: 'Cleaning' },
      { id: 'repair', label: 'Repair' },
    ],
    acType: [
      { id: 'all', label: 'All AC Types' },
      { id: 'split', label: 'Split AC' },
      { id: 'window', label: 'Window AC' },
    ],
    price: [
      { id: 'all', label: 'All Prices' },
      { id: 'low', label: 'Under $50' },
      { id: 'high', label: 'Above $100' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-8 text-center">
        <h1 className="font-roboto-condensed text-3xl font-bold text-[#02368c]">
          Testing New Service Detail Sections
        </h1>
        <p className="font-poppins text-sm text-gray-600 mt-2">
          These are the sections you added from Figma
        </p>
      </div>

      <ServiceCategoryPills
        categories={serviceCategories}
        activeCategory="ac-service"
      />

      <ServiceFilterSort
        title="AC Service & Repair"
        serviceCount={12}
        filters={filters}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="font-poppins text-gray-700">
            ✅ If you can see the pill navigation above and the filter/sort bar, the components are working!
          </p>
          <p className="font-poppins text-sm text-gray-500 mt-4">
            These sections will appear on the service detail page at:<br/>
            <code className="bg-gray-100 px-2 py-1 rounded">/services/[category]/[serviceId]</code>
          </p>
        </div>
      </div>
    </div>
  );
}
