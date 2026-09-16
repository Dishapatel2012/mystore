// import React from 'react'
// import Home from './Pages/Home'
// import About from './Pages/About'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from './Layout/Layout';
// import Login from './Pages/Login';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/login" element={<Login />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import ManageProducts from "./Admin/ManageProducts";
import ManageCategories from "./Admin/ManageCategories";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import ManageOrders from "./Admin/ManageOrders";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/ManageProducts" element={<ManageProducts />} />
          <Route path="/ManageCategories" element={<ManageCategories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
         <Route path="/order" element={<Order />} />
         <Route path="/manage-orders" element={<ManageOrders />} />
         <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;