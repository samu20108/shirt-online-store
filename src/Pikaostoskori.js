import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";
import ProductCard from "./ProductCard";

const Pikaostoskori = ({ isCartOpen, setIsCartOpen }) => {
  const { cartItems, discountPercentage, itemAmount, products, cartTotal } =
    useGlobalContext();

  //Check if clicked outside
  const handleClick = (event) => {
    const target = event.target;
    if (target.classList.contains("cart-container")) {
      setIsCartOpen(false);
    } else {
    }
  };
  const cartText = () => {
    if (itemAmount > 1) {
      return `Ostoskorissa on ${itemAmount} tuotetta`;
    } else {
      return `Ostoskorissa on ${itemAmount} tuote`;
    }
  };
  return (
    <div
      className={`${
        isCartOpen ? "cart-container show-cart-container" : "cart-container"
      }`}
      onClick={handleClick}
    >
      <div className={`${isCartOpen ? "cart show-cart" : "cart"}`}>
        <button className="del-btn" onClick={() => setIsCartOpen(false)}>
          <FaTimes />
        </button>
        <h2>Pikaostoskori</h2>

        {itemAmount > 0 ? (
          <>
            <h3>{cartText()}</h3>
            {products.map((item) => {
              if (cartItems.has(item.id) & (cartItems.get(item.id) > 0)) {
                const id = item.id;
                return (
                  <ProductCard
                    key={item.id}
                    discountPercentage={discountPercentage}
                    changeAmountBtn={true}
                    amount={cartItems.get(id)}
                    {...item}
                    imgPath={null}
                  />
                );
              } else {
                return null;
              }
            })}
            <h3>Loppusumma on {cartTotal}€</h3>
            <button
              className="btn"
              onClick={() => alert("Jatketaan tilaukseen")}
            >
              Tilaa tuotteet
            </button>
          </>
        ) : (
          "Ostoskorissa ei ole tuotteita"
        )}
      </div>
    </div>
  );
};
export default Pikaostoskori;
