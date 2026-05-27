export default function Loading() {
  return (
    <div className="bg-medigrab-navy min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading">
      <div className="font-heading font-extrabold italic text-3xl animate-pulse">
        <span className="text-white">Pill</span>
        <span className="text-medigrab-teal">R</span>
        <span className="text-white">.in</span>
      </div>
    </div>
  );
}
