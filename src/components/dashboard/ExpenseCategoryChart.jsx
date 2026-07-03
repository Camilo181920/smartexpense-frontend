import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function ExpenseCategoryChart({ categories }) {

    const data = {
        labels: categories.map(item => item[0]),

        datasets: [
            {
                data: categories.map(item => item[1]),

                backgroundColor: [
                    "#3B82F6",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                    "#06B6D4"
                ]
            }
        ]
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-6">
                Gastos por categoría
            </h2>

            <div className="max-w-md mx-auto">
                <Pie data={data} />
            </div>
        </div>
    );
}