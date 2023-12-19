import React, { createContext, useReducer } from "react";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_QUANTITY":
      const oldState = { ...state };
      let updatedQty = false;
      const newExpenses = state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = expense.quantity + action.payload.quantity;
          updatedQty = true;
        }
        return expense;
      });
      const result = calculateSpentSoFarAndRemaining({ ...state, expenses: newExpenses });
      if (!result) {
        return oldState;
      }
      return {
        ...state,
        expenses: newExpenses,
      };

    // ... other cases ...

    default:
      return state;
  }
};

const calculateSpentSoFarAndRemaining = (state) => {
  const spentSoFar = state.expenses.reduce((total, item) => total + item.quantity, 0);
  const remaining = state.Budget - spentSoFar;
  if (remaining < 0) {
    alert("You cannot allocate more than the remaining budget");
    return false;
  }
  return true;
};

const initialState = {
  expenses: [
    // ... your expenses array ...
  ],
  Location: "$ Dollar",
  Budget: 100,
  Remaining: 100,
  SpentSoFar: 0,
};

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // ... your calculations for totalExpenses ...

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        CartValue: state.CartValue,
        dispatch,
        Location: state.Location,
        Budget: state.Budget,
        SpentSoFar: state.spentSoFar,
        Remaining: state.remaining,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
