import PODetails from "@/components/pages/PODetails";

export async function generateMetadata({ params }) {
  const idPO = decodeURIComponent(params.idPO);

  return {
    title: `${idPO} Approval - Petty Cash KPN`,
  };
}

export default function PODetailsAdminPage({ params }) {
  const idPO = decodeURIComponent(params.idPO);

  return <PODetails idPO={idPO} />;
}
