import { useEffect, useState } from "react";

import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseModal from "../components/expenses/ExpenseModal";

import {
  getExpenses
} from "../services/expenseService";


export default function Expenses() {

  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [loading, setLoading] = useState(true);


  const loadExpenses = async () => {

    try {

      setLoading(true);

      const data = await getExpenses();

      setExpenses(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadExpenses();
  }, []);



  const handleCreate = () => {
    setSelectedExpense({});
  };


  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-slate-800">
          Gastos
        </h1>


        <button
          onClick={handleCreate}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          + Nuevo gasto
        </button>

      </div>


      {loading ? (

        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          Cargando gastos...
        </div>

      ) : (

        <ExpenseTable
          expenses={expenses}
          onEdit={setSelectedExpense}
          onDeleted={loadExpenses}
        />

      )}



      <ExpenseModal
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
        onUpdated={loadExpenses}
      />


    </div>
  );
}