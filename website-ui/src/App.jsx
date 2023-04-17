import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Landing from "./pages/landing";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path='/' element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
