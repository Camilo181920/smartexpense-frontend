export default function SummaryCard({
  title,
  value,
  color = "border-blue-500",
  subtitle = "Actualizado hoy",
}) {
  return (
    <div
      className={`rounded-xl border-t-4 ${color} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold text-slate-800">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}