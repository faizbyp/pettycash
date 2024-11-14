import VendorDetails from "@/components/pages/master-data/VendorDetails";

export async function generateMetadata({ params }) {
  return {
    title: `${params.idVendor} Approval - Petty Cash KPN`,
  };
}

export default function VendorDetailsPage({ params }) {
  return <VendorDetails idVendor={params.idVendor} />;
}
