import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-pillr-black min-h-[70vh] flex items-center">
      <div className="mx-auto max-w-container px-6 text-center">
        <div className="mb-8 flex justify-center">
          <svg viewBox="0 0 200 80" width="160" height="64" aria-hidden="true">
            <g>
              <rect x="20" y="20" width="160" height="40" rx="20" fill="#FFFFFF" />
              <rect x="100" y="20" width="80" height="40" rx="0" fill="#DC191E" />
              <rect x="20" y="20" width="160" height="40" rx="20" fill="none" stroke="#000" strokeOpacity="0.15" strokeWidth="1.5" />
              <rect x="135" y="30" width="6" height="20" fill="#FFFFFF" />
              <rect x="125" y="37" width="26" height="6" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
        <h1 className="font-heading font-extrabold text-[44px] md:text-[64px] text-white leading-tight">
          404
        </h1>
        <h2 className="font-heading font-bold text-2xl text-white mb-3">Page Not Found</h2>
        <p className="text-pillr-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-base btn-primary">
          Go Home
        </Link>
      </div>
    </section>
  );
}
