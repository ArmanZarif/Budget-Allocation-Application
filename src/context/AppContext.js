import React, { createContext, useReducer } from "react";
// import Budget from "../components/Budget";

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  const oldExpenses=state.expenses;
  const JOE=JSON.stringify(oldExpenses);  
  console.log(JOE);
  let new_expenses = [];
  switch (action.type) {
    case "ADD_QUANTITY":      
      let updatedqty = false;
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = expense.quantity + action.payload.quantity;
          updatedqty = true;
        }
        new_expenses.push(expense);
        return true;
      });
           
      const oldRemaining = state.remaining;
      const oldSpentSoFor = state.spentSoFar;
      state.expenses = new_expenses;
      const Result = calculateSpentSoFarAndRemaining(state,"ADD_QUANTITY");
      action.type = "DONE";
      if(!Result){
        const oldExpensess = JSON.parse(JOE)        
        console.log('hi');
        console.log(oldExpensess);
        state.expenses=oldExpensess
        state.spentSoFar=oldSpentSoFor
        state.remaining=oldRemaining
        return{
          ...state,        
        } 
      }
      return {
        ...state,
      };

    case "RED_QUANTITY":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.quantity = expense.quantity - action.payload.quantity;
        }
        expense.quantity = expense.quantity < 0 ? 0 : expense.quantity;
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      calculateSpentSoFarAndRemaining(state);
      action.type = "DONE";
      return {
        ...state,
      };
    case "DELETE_ITEM":
      let deletedAmount ;
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          deletedAmount = expense.quantity;
          expense.quantity = 0;
        }        
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      state.Budget=state.Budget + deletedAmount;
      calculateSpentSoFarAndRemaining(state);
      action.type = "DONE";
      return {
        ...state,
      };
    case "CHG_LOCATION":
      action.type = "DONE";
      state.Location = action.payload;
      return {
        ...state,
      };
    case "CHG_Budget":
      const result = calculateSpentSoFarAndRemaining(state,"CHG_Budget",action.payload);
      if(!result){
        
        return{
          ...state
        }
      }
      state.Budget=action.payload;
      action.type = "DONE";
      return {
        ...state
      }


    default:
      return state;
  }
};

const calculateSpentSoFarAndRemaining = (state,actionType,payload) =>{ 
  // const oldSpentSoFor = state.spentSoFar; 
  if(actionType==="CHG_Budget" && payload < state.spentSoFar)
  {
    alert('You can not reduce the Budget lower than spending')    
    return false
  }
  const spentSoFar = state.expenses.reduce((total, item) => {
    return (total = total + item.quantity);
  }, 0);
  state.spentSoFar = spentSoFar;
  const remaining = state.Budget - spentSoFar;
  if(remaining<0 && actionType === "ADD_QUANTITY"){
    alert(`You can not Allocate more than the remaining Funds : ${state.remaining}`);
    return false
  }
  state.remaining = remaining;
  return true
}

// 1. Sets the initial state when the app loads
const initBudget = 100
const initialState = {
  expenses: [
    { id: "Marketing", name: "Marketing", quantity: 0, unitprice: 500 },
    { id: "Finance", name: "Finance", quantity: 0, unitprice: 300 },
    { id: "Sales", name: "Sales", quantity: 0, unitprice: 400 },
    { id: "Human Resource", name: "Human Resource", quantity: 0, unitprice: 600 },
    { id: "IT", name: "IT", quantity: 0, unitprice: 200 },
  ],
  Location: "$ Dollar",
  Budget: initBudget,
  remaining:initBudget,
  spentSoFar:0,
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const totalExpenses = state.expenses.reduce((total, item) => {
    return (total = total + item.unitprice * item.quantity);
  }, 0);
  state.CartValue = totalExpenses;

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        CartValue: state.CartValue,
        dispatch,
        Location: state.Location,
        Budget:state.Budget,
        SpentSoFar:state.spentSoFar,
        Remaining:state.remaining,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
