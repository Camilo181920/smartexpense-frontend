import { deleteExpense } from "../../services/expenseService";
import { useNavigate } from "react-router-dom";

export default function ExpenseTable({ expenses, onEdit }) {
    
    const handleDelete = async (id) => {
        if (confirm("¿Eliminar este gasto?")) {
            await deleteExpense(id);
            window.location.reload();
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md mt-8 overflow-hidden">

            <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">
                    Últimos gastos
                </h2>
            </div>

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-4">Fecha</th>

                        <th className="text-left p-4">
                            Descripción
                        </th>

                        <th className="text-left p-4">
                            Categoría
                        </th>

                        <th className="text-right p-4">
                            Monto
                        </th>

                        <th className="text-center p-4">
                            Acciones
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {expenses.map(expense => (

                        <tr
                            key={expense.id}
                            className="border-t hover:bg-gray-50">

                            <td className="p-4">
                                {new Date(expense.createdAt).toLocaleDateString()}
                            </td>

                            <td className="p-4">
                                {expense.title}
                            </td>

                            <td className="p-4">
                                {expense.category}
                            </td>

                            <td className="p-4 text-right font-semibold">
                                ${expense.amount}
                            </td>

                            <td className="p-4 text-center">

                                <button
                                    onClick={() => onEdit(expense)}
                                    className="text-blue-600 hover:text-blue-800 mr-4">
                                    ✏️
                                </button>

                                <button
                                    onClick={() => handleDelete(expense.id)}
                                    className="text-red-600 hover:text-red-800">
                                    🗑️
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );

}