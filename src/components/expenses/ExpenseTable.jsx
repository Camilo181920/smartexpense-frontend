import { deleteExpense } from "../../services/expenseService";

export default function ExpenseTable({
  expenses,
  onEdit,
  onDeleted,
}) {

  const expenseList = expenses ?? [];

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Deseas eliminar este gasto?"
    );

    if (!confirmed) return;

    try {
      await deleteExpense(id);

      if (onDeleted) {
        onDeleted();
      }

    } catch (error) {
      console.error(error);
      alert("No fue posible eliminar el gasto.");
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES");

  return (
    <section className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">

      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Últimos gastos
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Historial de transacciones registradas.
        </p>
      </div>

      {expenseList.length === 0 ? (

        <div className="flex h-52 items-center justify-center">

          <p className="text-slate-500">
            No hay gastos registrados.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr className="text-sm uppercase tracking-wide text-slate-500">

                <th className="p-4 text-left">
                  Fecha
                </th>

                <th className="p-4 text-left">
                  Descripción
                </th>

                <th className="p-4 text-left">
                  Categoría
                </th>

                <th className="p-4 text-right">
                  Monto
                </th>

                <th className="p-4 text-center">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody>

              {expenseList.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-t transition-colors hover:bg-slate-50"
                >

                  <td className="p-4">
                    {formatDate(expense.createdAt)}
                  </td>

                  <td className="p-4 font-medium text-slate-700">
                    {expense.title}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                      {expense.category}
                    </span>
                  </td>

                  <td className="p-4 text-right font-semibold text-red-600">
                    {formatCurrency(expense.amount)}
                  </td>

                  <td className="space-x-2 p-4 text-center">

                    <button
                      onClick={() => onEdit(expense)}
                      className="rounded-md bg-blue-100 px-3 py-1 text-blue-700 transition hover:bg-blue-200"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="rounded-md bg-red-100 px-3 py-1 text-red-700 transition hover:bg-red-200"
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </section>
  );
}