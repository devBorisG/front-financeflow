import './infrastructure/css/reset.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage} from "./infrastructure/components/HomePage.tsx";
import {Login} from "./infrastructure/components/Login.tsx";
import {DashBoard} from "./infrastructure/components/DashBoard.tsx";
import {Goals} from "./infrastructure/components/Goals.tsx";
import {Budgets} from "./infrastructure/components/Budgets.tsx";
import {Statistics} from "./infrastructure/components/Statistics.tsx";
import {User} from "./infrastructure/components/User.tsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<DashBoard />}/>
              <Route path="/goals" element={<Goals />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/user" element={<User />} />
              <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
