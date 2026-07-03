import { useState, useEffect } from "react";
import { updateExpense } from "../../services/expenseService";
import api from "../../api/axiosConfig";

export default function ExpenseModal({ expense, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(expense?.id);

  useEffect(() => {
    if (isEdit) {
      setForm({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
      });
    } else {
      setForm({
        title: "",
        amount: "",
        category: "",
      });
    }
  }, [expense, isEdit]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Ingrese un título.");
      return;
    }

    if (!form.category.trim()) {
      alert("Ingrese una categoría.");
      return;
    }

    if (Number(form.amount) <= 0) {
      alert("El monto debe ser mayor que cero.");
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await updateExpense(expense.id, form);
      } else {
        await api.post("/expenses", form);
      }

      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("No fue posible guardar el gasto.");
    } finally {
      setLoading(false);
    }
  };

  if (expense === null) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          {isEdit ? "Editar gasto" : "Nuevo gasto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Título
            </label>

            <input
              autoFocus
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ej. Compra supermercado"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Monto
            </label>

            <input
              required
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              Categoría
            </label>

            <input
              required
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Ej. Alimentación"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg bg-slate-200 px-4 py-2 transition hover:bg-slate-300 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {loading
                ? "Guardando..."
                : isEdit
                ? "Actualizar"
                : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}