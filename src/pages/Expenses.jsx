import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/expenses");
      setExpenses(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Expenses</h1>

      {expenses.map((e) => (
        <div key={e.id}>
          <p>{e.title} - {e.amount} - {e.category}</p>
        </div>
      ))}
    </div>
  );
}