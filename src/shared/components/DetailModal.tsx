export default function DetailModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-base-300 opacity-70 backdrop-blur-xl z-50">
      <div className="card bg-base-100 shadow-xl z-50 p-6">
        <div>{children}</div>
      </div>
    </div>
  );
}
