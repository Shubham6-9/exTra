import { createStore } from 'redux'
import reducer from './expenseReducer'

const store = createStore(reducer)

export default store