import PageHero from "@/components/ui/PageHero";
import ForgotPasswordView from "@/components/auth/ForgotPasswordView";

export const metadata = {
  title: "Forgot password",
  description:
    "Reset your PADDLEHAUS password with a code sent to your email, or sign in with a one-time code to your mobile.",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Forgot your password"
        titleAccent="password"
        copy="We will email you a six-digit code. Enter it with a new password and you are back in."
        crumbs={[{ label: "Forgot password" }]}
      />

      <ForgotPasswordView />
    </>
  );
}
