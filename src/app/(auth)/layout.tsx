import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="text-2xl font-bold gradient-text block text-center mb-8">
          ForJClients
        </Link>
        {children}
      </div>
    </div>
  );
}
