import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar.js";
import RecordList from "./components/recordList.js";
import Edit from "./components/edit.js";

import Register from "./components/register.jsx";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/register" element={<Register />} />
     </Routes>
   </div>
 );
};
 
export default App;
