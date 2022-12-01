<<<<<<< HEAD
import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, BrowserRouter, Routes } from "react-router-dom";
import './index.css'
// We import all the components we need in our app
import Navbar from "./components/navbar.js";
// import RecordList from "./components/recordList.js";
// import Edit from "./components/edit.js";

import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
 
const App = () => {
 return (
//   <div className="bg-gray-900 min-h-screen">
//   <BrowserRouter>
//       <Routes>
//           <Route exact path="/"/>
//           <Route component={Register} exact path="/register"/>
//           <Route component={Login}  exact path="/login"/>
//       </Routes>
//   </BrowserRouter>
// </div>

   <div className="bg-gray-900 min-h-screen">
     <Navbar />
     <Routes>
       <Route exact path="/" />
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
     </Routes>
   </div>
 );
};

export default App;

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route exact path="/" element={<RecordList />} />
//         <Route path="/edit/:id" element={<Edit />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </div>
//   );
//  };
=======
import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar.js";
import RecordList from "./components/recordList.js";
import Edit from "./components/edit.js";
import Create from "./components/create.js";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;
>>>>>>> 4e471e2ceb9ace7273c01a6b48a94098e03709b7
