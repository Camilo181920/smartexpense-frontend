import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseCategoryChart({ categories }) {

  const hasData = categories?.length > 0;

  const data = {
    labels: categories?.map((item) => item[0]) ?? [],

    datasets: [
      {
        data: categories?.map((item) => item[1]) ?? [],

        backgroundColor: [
          "#2563EB", // Blue
          "#10B981", // Green
          "#F59E0B", // Yellow
          "#EF4444", // Red
          "#8B5CF6", // Purple
          "#06B6D4", // Cyan
        ],

        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },

      tooltip: {
        backgroundColor: "#1E293B",
        padding: 12,
      },
    },
  };

  return (
    <section
      aria-label="Gastos por categoría"
      className="mt-8 rounded-xl bg-white p-6 shadow-sm"
    >

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Gastos por categoría
          </h2>

          <p className="text-sm text-slate-500">
            Distribución de los gastos registrados
          </p>
        </div>

      </div>

      {hasData ? (
        <div className="mx-auto h-80 max-w-lg">
          <Pie data={data} options={options} />
        </div>
      ) : (
        <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-slate-200">

          <div className="text-center">

            <p className="text-lg font-medium text-slate-700">
              No hay datos disponibles
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Agrega algunos gastos para visualizar el gráfico.
            </p>

          </div>

        </div>
      )}
    </section>
  );
}