import ConsultaCatalogo from "./componentes/ConsultaCatalogo";
import Header from "./componentes/Header";
import Footer from "./componentes/Footer";
import UploadImagem from "./componentes/UploadImagem";
import CadastrarProduto from "./componentes/CadastrarProduto";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/*//http://localhost:3000 */}
          <Route path="/" element={<ConsultaCatalogo />}></Route>
          {/*//http://localhost:3000/produtos*/}
          <Route path="/produtos" element={<ConsultaCatalogo />}></Route>
          {/*//http://localhost:3000/cad-produto*/}
          <Route
            path="/cad-produto"
            element={<CadastrarProduto />}
          ></Route> {/* http://localhost:3000/edit-produto*/}{" "}
          <Route
            path="/edit-produto/:id"
            element={<CadastrarProduto />}
          ></Route>
          <Route path="/upload" element={<UploadImagem />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
