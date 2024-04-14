import './infrastructure/css/reset.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage} from "./infrastructure/components/HomePage.tsx";
import {Login} from "./infrastructure/components/Login.tsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
