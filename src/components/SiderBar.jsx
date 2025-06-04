import { Search, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import propTypes from "prop-types";
import logo from "../assets/logo1.png";

function SideBar({ search, setSearch }) {
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
      <div
        className={`absolute top-0 left-0 w-full p-1 bg-[#141416] shadow-md z-10 flex items-center justify-between transition-opacity duration-300 ${
          isMobile ? " h-[140px]" : " h-[70px]"
        } `}
      >
        <div
          className={`flex items-center gap-4 ${
            isMobile ? "flex-col w-full" : ""
          }`}
        >
          <div>
            <img src={logo} alt="Logo React Shop" className="w-[70px]" />
          </div>
          <div
            className={`flex justify-between items-center bg-[#303030] p-2 rounded-md ${
              isMobile ? "w-full" : ""
            }`}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent focus:outline-none text-[#F6EFDF] placeholder-[#F6EFDF]"
              placeholder="Pesquisar produto..."
            />
            <Search color=" #F6EFDF" size={25} />
          </div>
          {/*<div className="flex gap-5 items-center">
            <button
              className={`text-[#F6EFDF] text-[18px] hover:text-[#FB8919] ${
                location.pathname === "/" &&
                "underline underline-offset-2 text-[#FB8919]"
              } `}
              onClick={() => navigate("/")}
            >
              Produtos
            </button>
            <button
              className={`text-[#F6EFDF] text-[18px]  hover:text-[#FB8919] ${
                location.pathname === "/categories" &&
                "underline underline-offset-2 text-[#FB8919]"
              } `}
              onClick={() => navigate("/categories")}
            >
              Categorias
            </button>
          </div>*/}
        </div>
      </div>
    </>
  );
}

SideBar.propTypes = {
  search: propTypes.string,
  setSearch: propTypes.func,
};

export default SideBar;
