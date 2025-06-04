import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Inicio from "./components/Inicio";
import { useState } from "react";
import SideBar from "./components/SiderBar";
import Product from "./components/Product";
import PropTypes from "prop-types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect } from "react";

function formatarParaReal(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function Sections({ search, listaCarrinho, setListaCarrinho }) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/reactShop" element={<Inicio search={search} />} />
          <Route
            path="/reactShop/product/:id"
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Router>
        {open && <ToastContainer />}
        <div
          onClick={() => setOpen(!open)}
          className="p-3 z-50 absolute top-2 right-2 rounded-md bg-[#2c2c2c] hover:bg-[#222226] hover:rounded-md cursor-pointer active:bg-[#070708] active:scale-90"
        >
          <ShoppingCart color={"#F6EFDF"} />
          {listaCarrinho.length > 0 && (
            <div className="absolute bottom-[-5px] right-[-5px] p-[2px] min-w-[20px] min-h-[20px] flex items-center justify-center bg-[#FB8919] rounded-full">
              <button className="text-white text-[10px] text-center font-bold pointer-events-none select-none">
                {listaCarrinho.length}
              </button>
            </div>
          )}
        </div>
        <div
          className={`absolute top-[67px] right-1 z-40  rounded-md border border-[#aaaaaa] bg-[#303030] flex-col ${
            isMobile ? "w-[98vw] h-[80vh]" : "w-[350px] h-[626px]"
          }`}
          style={{
            display: open ? "flex" : "none",
            padding: "12px 0px 50px 12px",
          }}
        >
          <div className="absolute -top-[10px] right-4 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#aaaaaa]">
            <div className="absolute top-[1px] left-[-9px] w-0 h-0 border-l-[9px] border-r-[9px] border-b-[9px] border-l-transparent border-r-transparent border-b-[#f1f1f1]"></div>
          </div>

          <p className="text-[#F6EFDF] text-[14px] font-semibold mb-2">
            Carrinho de compras
          </p>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {listaCarrinho.length <= 0 ? (
              <div className="flex items-center w-[100%] justify-center h-[600px]">
                <p className="text-[#707070] text-[14px] text-center font-semibold">
                  Não há items no carrinho
                </p>
              </div>
            ) : (
              listaCarrinho.map((cart) => (
                <div
                  key={cart.id}
                  className="flex flex-col mr-[12px] gap-2 p-2 border border-[#aaaaaa] bg-[#ffffff] rounded-md"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-[#707070] text-[14px] font-semibold truncate w-[200px]">
                      {cart.title}
                    </p>
                    <p className="text-green-600 text-[14px] font-semibold">
                      {formatarParaReal(cart.price)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-[#707070] text-[12px] font-semibold">
                        Quantidade: {cart.quantity}
                      </p>

                      <Minus
                        color={"#FB8919"}
                        className="cursor-pointer active:scale-90"
                        onClick={() => {
                          setListaCarrinho(
                            (prev) =>
                              prev.map((item) =>
                                item.id === cart.id
                                  ? { ...item, quantity: item.quantity - 1 }
                                  : item
                              ),
                            toast.success("Item removido com sucesso!", {
                              position: "bottom-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                            })
                          );
                          if (cart.quantity === 1) {
                            setListaCarrinho((prev) =>
                              prev.filter((item) => item.id !== cart.id)
                            ),
                              toast.success("Item removido com sucesso!", {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                              });
                          }
                        }}
                      />
                      <Plus
                        color={"#FB8919"}
                        className="cursor-pointer active:scale-90"
                        onClick={() => {
                          setListaCarrinho(
                            (prev) =>
                              prev.map((item) =>
                                item.id === cart.id
                                  ? { ...item, quantity: item.quantity + 1 }
                                  : item
                              ),
                            toast.success("Item adicionado com sucesso!", {
                              position: "bottom-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                            })
                          );
                        }}
                      />
                    </div>
                    <p className="text-[#707070] text-[12px] font-semibold">
                      Total: {formatarParaReal(cart.price * cart.quantity)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setListaCarrinho((prev) =>
                        prev.filter((item) => item.id !== cart.id)
                      );
                    }}
                    className="bg-[#FB8919] text-[#F6EFDF] text-[12px] font-semibold p-1 rounded-md active:scale-90 hover:bg-[#F6EFDF] hover:text-[#FB8919]"
                  >
                    Remover do carrinho
                  </button>
                  <div className="absolute bottom-0 left-0 w-full flex items-center justify-between p-2 bg-[#aaaaaa]">
                    <p className="text-[#F6EFDF] text-[12px] font-semibold">
                      Total: {formatarParaReal(valorTotal)}
                    </p>
                    <button className="bg-[#FB8919] text-[#F6EFDF] text-[12px] font-semibold p-1 rounded-md active:scale-90 hover:bg-[#F6EFDF] hover:text-[#FB8919]">
                      Finalizar compra
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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
