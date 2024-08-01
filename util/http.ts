import axios from "axios";

const BACKEND_URL =
  "https://expense-tracker-37b6c-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData: any) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id: any, expenseData: any) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id: any) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
