import PODetails from "@/components/pages/po/PODetails";

export async function generateMetadata({ params }) {
  const idPO = decodeURIComponent(params.idPO);

  return {
    title: `${idPO} - Petty Cash KPN`,
  };
}

export default function PODetailsUserPage({ params }) {
  const idPO = decodeURIComponent(params.idPO);

  return <PODetails idPO={idPO} />;
}
