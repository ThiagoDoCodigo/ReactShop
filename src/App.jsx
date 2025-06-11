import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Inicio from "./components/Inicio";
import { useState } from "react";
import SideBar from "./components/SiderBar";
import Product from "./components/Product";
import PropTypes from "prop-types";

import { useEffect } from "react";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";

function Sections({ search, listaCarrinho, setListaCarrinho }) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/ReactShop" element={<Inicio search={search} />} />
          <Route
            path="/ReactShop/product/:id"
            element={
              <Product
                listaCarrinho={listaCarrinho}
                setListaCarrinho={setListaCarrinho}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [listaCarrinho, setListaCarrinho] = useState([]);

  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const total = listaCarrinho.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setValorTotal(total);
  }, [listaCarrinho]);

  return (
    <>
      <Router>
        <ToastContainer />
        <Cart
          open={open}
          setOpen={setOpen}
          listaCarrinho={listaCarrinho}
          setListaCarrinho={setListaCarrinho}
          valorTotal={valorTotal}
        />

        <SideBar search={search} setSearch={setSearch} />
        <Sections
          search={search}
          listaCarrinho={listaCarrinho}
          setListaCarrinho={setListaCarrinho}
        />
      </Router>
    </>
  );
}

Sections.propTypes = {
  search: PropTypes.string.isRequired,
  listaCarrinho: PropTypes.array.isRequired,
  setListaCarrinho: PropTypes.func.isRequired,
};

export default App;
