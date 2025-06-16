export function addCategory(value) {
    return {
        type: "ADD_CATEGORY",
        payload: value
    }
}

export const addEntry = (obj, cate, amt) => {
    return {
        type: "ADD_EXPENSE",
        payload: [obj, cate, amt]
    }
}

export const deleteEntry = (id, amt, cate) => {
    return {
        type: "DELETE_EXPENSE",
        payload: [id, amt, cate]
    }
}