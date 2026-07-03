export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        SmartExpense
      </h1>

      <nav className="space-y-3">
        <a
          href="/dashboard"
          className="block rounded-lg px-4 py-2 hover:bg-slate-700"
        >
          Dashboard
        </a>

        <a
          href="/expenses"
          className="block rounded-lg px-4 py-2 hover:bg-slate-700"
        >
          Expenses
        </a>

        <a
          href="#"
          className="block rounded-lg px-4 py-2 hover:bg-slate-700"
        >
          Categories
        </a>

        <a
          href="#"
          className="block rounded-lg px-4 py-2 hover:bg-slate-700"
        >
          Profile
        </a>
      </nav>
    </aside>
  );
}