export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-sky/5">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-brand-orange animate-spin"></div>
        <div className="absolute top-0 start-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-brand-navy animate-spin animation-delay-500 opacity-50"></div>
      </div>
    </div>
  );
}

