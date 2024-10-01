import GRDetails from "@/components/pages/GRDetails";

export async function generateMetadata({ params }) {
  const idGR = decodeURIComponent(params.idGR);

  return {
    title: `${idGR} - Petty Cash KPN`,
  };
}

export default function GRDetailsUserPage({ params }) {
  const idGR = decodeURIComponent(params.idGR);

  return <GRDetails idGR={idGR} />;
}
