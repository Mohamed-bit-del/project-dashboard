export const metadata = {
  title: "Login",
  description: "Auth layout",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </section>
  );
}