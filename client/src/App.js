import logo from "./logo.svg";
import "./App.css";
import Formregissup from "./components/Formregissup";
import Formsearchsup from "./components/Formsearchsup";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addgoods from "./components/Addgoods";
import Goods from "./components/Goods";
import Sumgoods from "./components/Sumgoods";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Formregissup />} />
          <Route path="/addgoods" element={<Addgoods />} />
          <Route path="/" element={<Formsearchsup />} />
          <Route path="/goods" element={<Goods />} />
          <Route path="/sumgoods" element={<Sumgoods />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
