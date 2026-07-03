export default function Navbar() {
  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          U
        </div>

        <span className="font-medium">
          User
        </span>
      </div>
    </header>
  );
}