import { useGlobalContext } from "./context";
import { FaPlus, FaMinus } from "react-icons/fa";

const ProductCard = ({
  id,
  imgPath,
  name,
  color,
  price,
  amount,
  discountPercentage,
  cartBtn,
  changeAmountBtn,
}) => {
  const { addItem, deleteItem } = useGlobalContext();

  return (
    <article className="product-card" id={id}>
      <button className="card-btn">
        {imgPath ? (
          <img src={imgPath} className="product-img" alt={name} />
        ) : null}
        <p>{`${color} ${name}`}</p>
        <div className="price-container">
          <p>{`${(price - price * discountPercentage).toFixed(2)}€`}</p>
          <p
            className={`${discountPercentage ? "show-ovh-price" : "ovh-price"}`}
          >{`${price}€`}</p>
        </div>
        {amount ? <p>Määrä: {amount}</p> : null}
      </button>
      {cartBtn ? (
        <button className="add-cart-btn" onClick={() => addItem(id)}>
          Lisää ostoskoriin
        </button>
      ) : null}
      {changeAmountBtn ? (
        <div className="ammount-btn">
          <button className="more-btn" onClick={() => addItem(id)}>
            <FaPlus />
          </button>
          <button className="del-btn" onClick={() => deleteItem(id)}>
            <FaMinus />
          </button>
        </div>
      ) : null}
    </article>
  );
};
export default ProductCard;
