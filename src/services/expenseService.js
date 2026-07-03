import api from "../api/axiosConfig";

export const getSummary = async () => {
    const response = await api.get("/expenses/summary");
    return response.data;
};

export const getExpenses = async () => {
    const response = await api.get("/expenses");
    return response.data;
};

export const getExpensesByCategory = async () => {
    const response = await api.get("/expenses/by-category");
    return response.data;
};

export const updateExpense = async (id, data) => {
    const res = await api.put(`/expenses/${id}`, data);
    return res.data;
};

export const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
};