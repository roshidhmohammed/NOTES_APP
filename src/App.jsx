import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Alert from "./components/common/Alert";
import Home from "./components/Home";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./components/Layout";
import NewNote from "./components/NewNote";

function App() {
  return (
    <div className="bg-[#232325] h-screen">
      <Alert />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index path="/home" element={<Home />} />
              <Route index path="/note/:id" element={<NewNote />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
