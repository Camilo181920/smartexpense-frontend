import { useCallback, useEffect, useState } from "react";

import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseCategoryChart from "../components/dashboard/ExpenseCategoryChart";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseModal from "../components/expenses/ExpenseModal";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/common/LoadingScreen";

import {
    getSummary,
    getExpenses,
    getExpensesByCategory
} from "../services/expenseService";

export default function Dashboard() {

    const { token } = useAuth();
    const [total, setTotal] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const [summary, expensesData, categoryData] = await Promise.all([
                getSummary(),
                getExpenses(),
                getExpensesByCategory()
            ]);
            setTotal(summary ?? 0);
            setExpenses(expensesData);
            setCategories(categoryData);
        } catch (error) {
            console.error(error);
            setError(
                "No se pudieron cargar los datos del dashboard."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        loadDashboard();
    }, [token, loadDashboard]);

    const handleUpdated = () => {
        loadDashboard();
    };

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
    };

    const handleCreate = () => {
        setSelectedExpense({});
    };

    const filteredExpenses = expenses.filter(exp => {

        const matchSearch =
            exp.title.toLowerCase().includes(search.toLowerCase());

        const matchCategory =
            categoryFilter === "" ||
            exp.category.toLowerCase().includes(categoryFilter.toLowerCase());

        return matchSearch && matchCategory;
    });

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-100 p-4 text-red-700">
                {error}
            </div>
        );
    }
    
    return (
        <>
            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Nuevo gasto
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar gasto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/2"
                />

                <input
                    type="text"
                    placeholder="Filtrar por categoría..."
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/2"
                />
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

                <SummaryCard
                    title="Total Gastado"
                    value={`$${total}`}
                    color="border-red-500"
                />

                <SummaryCard
                    title="Número de gastos"
                    value={expenses.length}
                    color="border-blue-500"
                />

                <SummaryCard
                    title="Categorías"
                    value={categories.length}
                    color="border-green-500"
                />

            </div>

            {/* CHART */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
                <ExpenseCategoryChart categories={categories} />
            </div>

            {/* TABLE */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
                <ExpenseTable
                    expenses={filteredExpenses}
                    onEdit={handleEdit}
                    onDeleted={loadDashboard}
                />
            </div>

            {/* MODAL */}
            <ExpenseModal
                expense={selectedExpense}
                onClose={() => setSelectedExpense(null)}
                onUpdated={handleUpdated}
            />

        </>
    );
}