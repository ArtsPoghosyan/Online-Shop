import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { user, initalUser } from "./slice/userSlice/UserReducer";
import { products, initalProducts } from "./slice/productSlice/ProductReducer";
import { initalOrders, orders } from "./slice/orderSlice/OrderReducer";

const store = createStore(combineReducers({
    user,
    products,
    orders
}), {
    user: initalUser,
    products: initalProducts,
    orders : initalOrders
}, applyMiddleware(thunk));

export default store;