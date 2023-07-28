import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams} from "react-router-dom";
import Main from "./componets/Main";
import store from "../redux/store";
import Search from "./componets/Search";
import ProductPage from "./componets/ProductPage";
import SignUp from "./componets/SignUp";
import SignIn from "./componets/SignIn";
import Cart from "./componets/Cart";
import Profile from "./componets/Profile";
import Shipping from "./componets/Shipping";
import Payment from "./componets/Payment";
import Placeorder from "./componets/Placeorder";
import Order from "./componets/Order";
import HistoryOrders from "./componets/HistoryOrders";
import AdminPanel from "./componets/AdminPanel";
import UpdateProductAdmin from "./componets/AdminProdcutForUpdate";

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Provider store={store}><Main /></Provider> }/>
                <Route path="/admin" element={<Provider store={store}><AdminPanel /></Provider> }/>
                <Route path="/update-product-:productId" element={<Provider store={store}><UpdateProductAdmin /></Provider> }/>
                <Route path="/search" element={<Provider store={store}><Search /></Provider> }/>
                <Route path="/one-product-:id" element={<Provider store={store}><ProductPage /></Provider> }/>
                <Route path="/signin" element={<Provider store={store}><SignIn /></Provider> }/>
                <Route path="/signup" element={<Provider store={store}><SignUp /></Provider> }/>
                <Route path="/shipping" element={<Provider store={store}><Shipping /></Provider> }/>
                <Route path="/payment" element={<Provider store={store}><Payment /></Provider> }/>
                <Route path="/placeorder" element={<Provider store={store}><Placeorder /></Provider> }/>
                <Route path="/cart" element={<Provider store={store}><Cart /></Provider> }/>
                <Route path="/profile" element={<Provider store={store}><Profile /></Provider> }/>
                <Route path="/order-:orderId" element={<Provider store={store}><Order /></Provider> }/>
                <Route path="/history-order" element={<Provider store={store}><HistoryOrders /></Provider> }/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default App;