import ResetPass from "@/components/pages/auth/ResetPass";

export const metadata = {
  title: "Reset Password - Petty Cash KPN",
};

export default function ResetPassPage({ params }) {
  return <ResetPass email={params.email} />;
}
