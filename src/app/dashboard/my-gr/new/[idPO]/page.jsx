import NewGR from "@/components/pages/gr/NewGR";

export async function generateMetadata({ params }) {
  const idPO = decodeURIComponent(params.idPO);

  return {
    title: `GR ${idPO} - Petty Cash KPN`,
  };
}

export default function NewGRPage({ params }) {
  const idPO = decodeURIComponent(params.idPO);

  return <NewGR idPO={idPO} />;
}
