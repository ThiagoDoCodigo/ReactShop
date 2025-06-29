import {
  Banknote,
  FolderPen,
  RotateCw,
  ShoppingBasket,
  ShoppingCart,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "./PageTransition";
import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();

    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  return isMobile;
}

function formatarParaReal(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function Inicio({ search }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectCategory, setSelectCategory] = useState("Todos");

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  const toastId = "filtro-todos";

  const [lista, setLista] = useState([]);
  useEffect(() => {
    if (selectCategory === "Todos") {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${API_URL}/products`);
          setLista(response.data);
          toast.success("Filtro aplicado com sucesso!", {
            toastId: `Filtro-${selectCategory}`,
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
          toast.error("Erro ao buscar produtos!", {
            toastId,
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      };

      fetchProducts();
    }

    if (selectCategory !== "Todos") {
      const fetchProductsByCategory = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/products/category/${selectCategory}`
          );
          setLista(response.data);
          toast.success(`Filtro por ${selectCategory} aplicado com sucesso!`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (error) {
          console.error("Erro ao buscar produtos por categoria:", error);
          toast.error("Erro ao buscar produtos por categoria!", {
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

      fetchProductsByCategory();
    }
  }, [selectCategory]);

  const [listaFiltrada, setListaFiltrada] = useState([]);

  useEffect(() => {
    const listaItems = lista;

    if (search !== "") {
      const filteredItems = listaItems.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setListaFiltrada(filteredItems);
    } else {
      setListaFiltrada(listaItems);
    }
  }, [search, lista]);

  return (
    <PageTransition>
      {!lista || !categories ? (
        <div className="absolute top-0 left-0 h-[100vh] w-[100vw] bg-[#303030] px-4 flex items-center flex-col justify-center z-30">
          <RotateCw size={40} color="#f7f7f7" className="animate-spin" />
          <p className="text-[#f7f7f7]">Carregando...</p>
        </div>
      ) : (
        <div
          className={`absolute left-0 w-full flex flex-col ${
            isMobile
              ? "top-[128px] h-[calc(100vh-128px)]"
              : "top-[70px]  h-[calc(100vh-70px)]"
          }`}
        >
          <div className="flex flex-col w-full">
            <div className="w-full overflow-x-auto">
              <div className="flex items-center gap-3 px-1 py-3 w-max whitespace-nowrap">
                <button
                  className={`text-[#F6EFDF] text-[18px] hover:text-[#FB8919] z-20 ${
                    selectCategory === "Todos" &&
                    "underline decoration-2 underline-offset-8 text-[#FB8919]"
                  } `}
                  onClick={() => setSelectCategory("Todos")}
                >
                  Todos
                </button>
                {categories.map((item, index) => (
                  <button
                    key={`${item}-${index}`}
                    className={`text-[#F6EFDF] text-[18px] hover:text-[#FB8919] z-20 ${
                      selectCategory === item &&
                      "underline decoration-2 underline-offset-8 text-[#FB8919]"
                    }`}
                    onClick={() => setSelectCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full h-[2px] bg-[#8b8b8b] mt-[-11px] mb-[10px]"></div>
          </div>

          <div className="flex gap-2 flex-wrap w-full px-1 overflow-y-auto py-2">
            {listaFiltrada.length === 0 ? (
              <p className="text-[#F6EFDF] text-[18px] w-full text-center">
                Nenhum item encontrado
              </p>
            ) : (
              listaFiltrada.map((item) => (
                <div
                  key={item.id}
                  className={`bg-[#141416] h-[400px] flex flex-col p-2 rounded-sm shadow-md ${
                    isMobile ? "w-full" : " w-[300px]"
                  }`}
                >
                  <div className="w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[240px] object-cover"
                    />
                  </div>
                  <div className="flex items-center p-1 mt-2">
                    <p
                      className="text-[#F6EFDF] font-semibold truncate"
                      title={item.title}
                    >
                      {item.title}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="flex items-center">
                      <Banknote className="text-[#F6EFDF] mr-1" size={20} />
                      <p className="text-[#F6EFDF] text-[14px]">Preço:</p>
                    </div>
                    <p className="text-green-600 text-[14px]">
                      {formatarParaReal(item.price)}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center mt-2">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={16} />
                      <p className="text-[#F6EFDF] text-[14px] mt-[2px]">
                        {item.rating.rate}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <ShoppingCart className="text-[#F6EFDF] mr-1" size={16} />
                      <p className="text-[#F6EFDF] text-[14px] mt-[2px]">
                        {item.rating.count}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/ReactShop/product/${item.id}`)}
                    className="bg-[#FB8919] text-[#F6EFDF] font-bold w-full mt-2 p-2 rounded-sm hover:bg-[#F6EFDF] hover:text-[#FB8919] active:bg-[#dddddd]"
                  >
                    Detalhes
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </PageTransition>
  );
}

Inicio.propTypes = {
  search: PropTypes.string.isRequired,
};

export default Inicio;
