import { combineReducers, createStore } from "redux";

import { Store } from "redux";

const initialStateAccount: StateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer: StateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

type StateAccount = {
  balance: number;
  loan: number;
  loanPurpose: string;
};
type ActionAccount =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { amount: number; purpose: string };
    }
  | { type: "account/payLoan" };
type StateCustomer = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};
type ActionCustomer =
  | {
      type: "customer/createCustomer";
      payload: { fullName: string; nationalID: string; createdAt: string };
    }
  | { type: "customer/updateName"; payload: string };

function accountReducer(
  state: StateAccount = initialStateAccount,
  action: ActionAccount
) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(
  state: StateCustomer = initialStateCustomer,
  action: ActionCustomer
) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}



const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store: Store<ReturnType<typeof rootReducer>, ActionAccount | 
ActionCustomer> = createStore(rootReducer);


// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// const ACOOUNT_DEPOSIT = "account/deposit";

function deposit(amount: number): ActionAccount {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount: number): ActionAccount {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount: number, purpose: string): ActionAccount {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose
    }
  };
}

function payLoan(): ActionAccount {
  return { type: "account/payLoan" };
}
// deposit
store.dispatch(deposit(500));
//withdraw
store.dispatch(withdraw(200));
console.log(store.getState());

// requestLoan
store.dispatch(requestLoan(1000, "Buy a cheap car"));
console.log(store.getState());

// payLoan
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName: string, nationalID: string): ActionCustomer {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName: string): ActionCustomer {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Jonas Schmedtmann", "24343434"));
store.dispatch(deposit(250));
console.log(store.getState());

export default store;