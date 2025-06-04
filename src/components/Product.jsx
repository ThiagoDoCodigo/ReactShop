import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Banknote,
  ChevronLeft,
  RotateCw,
  ShoppingCart,
  Star,
} from "lucide-react";
import ProdutoTransition from "./ProdutoTransition";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_URL_API;

function formatarParaReal(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function Product({ listaCarrinho, setListaCarrinho }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState({});

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, [id]);

  const [verificarCarrinho, setVerificarCarrinho] = useState(false);

  useEffect(() => {
    const existeNoCarrinho = listaCarrinho.some(
      (item) => Number(item.id) === Number(id)
    );
    setVerificarCarrinho(existeNoCarrinho);
  }, [listaCarrinho, id]);

  const adicionarCarrinho = (id, title, price) => {
    const item = {
      id: id,
      title: title,
      price: price,
      quantity: 1,
    };
    setListaCarrinho((prevCarrinho) => [...prevCarrinho, item]);
    if (item) {
      toast.success("Item adicionado ao carrinho!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const removerCarrinho = (id) => {
    setListaCarrinho((prevCarrinho) =>
      prevCarrinho.filter((item) => item.id !== id)
    );
    toast.success("Item removido do carrinho!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ProdutoTransition>
        {!item || !item.rating ? (
          <div className="absolute top-0 left-0 h-[100vh] w-[100vw] bg-[#303030] px-4 flex items-center flex-col justify-center z-30">
            <RotateCw size={40} color="#f7f7f7" className="animate-spin" />
            <p className="text-[#f7f7f7]">Carregando...</p>
          </div>
        ) : (
          <div
            className={`absolute top-0 left-0  w-[100vw] bg-[#303030] px-2 flex items-center justify-center z-30 ${
              isMobile ? "h-[80vh]" : "h-[100vh]"
            }`}
          >
            <div
              className="absolute top-2 left-2 flex items-center gap-2 cursor-pointer hover:bg-[#141416] px-2 py-1 rounded-sm"
              onClick={() => navigate("/reactshop/")}
            >
              <ChevronLeft className="text-[#F6EFDF] hover:text-[#FB8919] ml-[-7px]" />
              <p className="text-[#F6EFDF]">Voltar</p>{" "}
            </div>
            <div
              className={`bg-[#141416] min-h-[360px] p-2 flex flex-col rounded-sm shadow-md ${
                isMobile ? "w-full" : "w-auto"
              }`}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <div className={isMobile ? "w-full" : "w-[300px]"}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={` object-cover ${
                      isMobile ? "w-full h-[300px]" : "w-[300px] h-[300px]"
                    }`}
                  />
                </div>
                <div
                  className={`flex flex-col justify-between ${
                    isMobile ? "w-full gap-3 h-[160px]" : "w-[300px] h-[300px]"
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center p-1">
                      <p
                        className="text-[#F6EFDF] font-semibold truncate"
                        title={item.title}
                      >
                        {item.title}
                      </p>
                    </div>
                    <div className="flex items-center p-0">
                      <p
                        className="text-[#F6EFDF] text-[14px] line-clamp-5"
                        title={item.description}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1 items-center">
                      <div className="flex items-center">
                        <Banknote className="text-[#F6EFDF] mr-1" size={20} />
                        <p className="text-[#F6EFDF] text-[14px]">Preço:</p>
                      </div>
                      <p className="text-green-600 text-[14px]">
                        {formatarParaReal(item.price)}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <p className="text-[#F6EFDF] text-[14px] mt-[2px] mr-1">
                          Avaliação:
                        </p>
                        <p className="text-[#F6EFDF] text-[14px] mt-[2px]">
                          {item.rating.rate}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <ShoppingCart
                          className="text-[#F6EFDF] mr-1"
                          size={16}
                        />
                        <p className="text-[#F6EFDF] text-[14px] mt-[2px] mr-1">
                          Vendidos:
                        </p>
                        <p className="text-[#F6EFDF] text-[14px] mt-[2px]">
                          {item.rating.count}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  verificarCarrinho
                    ? removerCarrinho(item.id)
                    : adicionarCarrinho(item.id, item.title, item.price)
                }
                className="bg-[#FB8919] text-[#F6EFDF] font-bold w-full mt-2 p-2 rounded-sm hover:bg-[#F6EFDF] hover:text-[#FB8919] active:bg-[#dddddd]"
              >
                {verificarCarrinho
                  ? "Remover do carrinho"
                  : "Adicionar ao carrinho"}
              </button>
            </div>
          </div>
        )}
      </ProdutoTransition>
    </>
  );
}

Product.propTypes = {
  listaCarrinho: PropTypes.array.isRequired,
  setListaCarrinho: PropTypes.func.isRequired,
};

export default Product;
