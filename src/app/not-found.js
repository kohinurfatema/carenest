"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <div className="mt-4">
          <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-base-content/60 max-w-md mx-auto">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/" className="btn btn-primary gap-2">
            <Home size={18} />
            Go Home
          </Link>
          <button
            onClick={() => router.back()}
            className="btn btn-outline gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
