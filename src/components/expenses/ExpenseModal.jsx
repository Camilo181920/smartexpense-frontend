import { useState, useEffect } from "react";
import { updateExpense } from "../../services/expenseService";
import api from "../../api/axiosConfig";

export default function ExpenseModal({ expense, onClose, onUpdated }) {

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: ""
    });

    useEffect(() => {
        if (expense && expense.id) {
            setForm({
                title: expense.title,
                amount: expense.amount,
                category: expense.category
            });
        } else {
            setForm({
                title: "",
                amount: "",
                category: ""
            });
        }
    }, [expense]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEdit) {
            await updateExpense(expense.id, form);
        } else {
            await api.post("/expenses", form);
        }

        onUpdated();
        onClose();
    };

    const isEdit = expense && expense.id;
    if (expense === null) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl w-96">

                <h2 className="text-xl font-bold mb-4">
                    {isEdit ? "Editar gasto" : "Nuevo gasto"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Título"
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="amount"
                        type="number"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Monto"
                        className="w-full border p-2 rounded"
                    />

                    <input
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Categoría"
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex justify-end gap-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}