import './infrastructure/css/reset.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {HomePage} from "./infrastructure/components/HomePage.tsx";
import {Login} from "./infrastructure/components/Login.tsx";
import {DashBoard} from "./infrastructure/components/DashBoard.tsx";
import {Goals} from "./infrastructure/components/Goals.tsx";
import {Budgets} from "./infrastructure/components/Budgets.tsx";
import {Statistics} from "./infrastructure/components/Statistics.tsx";
import {User} from "./infrastructure/components/user/User.tsx";
import {UserProvider} from "./infrastructure/components/UserContext.tsx";
import {Category} from "./infrastructure/components/categorie/Category.tsx";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<UserProvider><Login /></UserProvider>} />
              <Route path="/dashboard" element={<UserProvider><DashBoard /></UserProvider>}/>
              <Route path="/goals" element={<UserProvider><Goals /></UserProvider>} />
              <Route path="/budgets" element={<UserProvider><Budgets /></UserProvider>} />
              <Route path="/statistics" element={<UserProvider><Statistics /></UserProvider>} />
              <Route path="/user" element={<UserProvider><User /></UserProvider>} />
              <Route path="/categorie" element={<UserProvider><Category /></UserProvider>} />
              <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
