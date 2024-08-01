import { createContext, ReactNode, useReducer } from "react";

interface expenseDataProps {
  description?: any;
  amount?: number;
  date?: any;
  children: ReactNode;
}

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({}) => {},
  setExpenses: (expenses: any) => {},
  deleteExpense: (id: any) => {},
  updateExpense: (id: any, { description, amount, date }: any) => {},
});

function expensesReducer(state: any[], action: any) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: expenseDataProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: any) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses: any) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id: any) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: any, expenseData: any) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
