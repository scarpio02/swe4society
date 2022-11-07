/*
import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
 
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
*/

import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { Register } from './components/register'
import { Login } from './components/login'
import { Profile } from './components/profile'

function App() {
  // <BrowserRouter>
  //   <Routes>
  //   <Route path="/" element={<App />}>
  //     <Route element={Register} path="/register"/>
  //     <Route element={Login} path="/login"/>
      
  //     </Route>
  //   </Routes>
  // </BrowserRouter>
  <p>hello</p>
}
//<Route component={ProfilePage} exact path="/u/:userId" />


export default App;


