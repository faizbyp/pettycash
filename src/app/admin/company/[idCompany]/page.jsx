import CompanyDetails from "@/components/pages/CompanyDetails";

export async function generateMetadata({ params }) {
  return {
    title: `${params.idCompany} - Petty Cash KPN`,
  };
}

export default function VendorDetailsPage({ params }) {
  return <CompanyDetails idCompany={params.idCompany} />;
}