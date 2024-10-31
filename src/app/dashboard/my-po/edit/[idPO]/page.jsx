import NewPO2 from "@/components/pages/NewPO2";

export async function generateMetadata({ params }) {
  const idPO = decodeURIComponent(params.idPO);
  return {
    title: `${idPO} - Petty Cash KPN`,
  };
}

export default function VendorDetailsPage({ params }) {
  const idPO = decodeURIComponent(params.idPO);
  return <NewPO2 idPO={idPO} />;
}
