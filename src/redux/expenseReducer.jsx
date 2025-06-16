const defaultState = {
    expenses: [],
    totalAmount: 0,
    categories: [
        { ctype: "Office Expense", count: 0, total: 0 },
        { ctype: "Transport", count: 0, total: 0 },
        { ctype: "Food", count: 0, total: 0 },
        { ctype: "Household", count: 0, total: 0 }
    ],
};

const localData = localStorage.getItem("ExpenseTracker");
const initialState = localData ? JSON.parse(localData) : defaultState;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, { ctype: action.payload, count: 0, total: 0 }]
            };
        case "ADD_EXPENSE":
            return {
                ...state,
                expenses: [...state.expenses, action.payload[0]],
                totalAmount: Number(state.totalAmount) + Number(action.payload[2]),
                categories: state.categories.map(cat => {
                    if (cat.ctype === action.payload[1]) {
                        return { ...cat, count: cat.count + 1, total: Number(cat.total) + Number(action.payload[2]) };
                    }
                    return cat;
                })
            };
        case "DELETE_EXPENSE":
            return {
                ...state,
                expenses: state.expenses.filter((e) => e.id !== action.payload[0]),
                totalAmount: Number(state.totalAmount) - Number(action.payload[1]),
                categories: state.categories.map((cat) => {
                    if (cat.ctype === action.payload[2]) {
                        return {
                            ctype: cat.ctype,
                            count: cat.count - 1,
                            total: Number(cat.total) - Number(action.payload[1])
                        };
                    }
                    return cat;
                })
            };
        default:
            return state;
    }
}