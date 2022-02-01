import { useGlobalContext } from "./context";
import ProductCard from "./ProductCard";

const Tuotenostot = () => {
  const { products, discountPercentage } = useGlobalContext();

  if (products.length === 0) {
    return (
      <main>
        <section>
          <h2>Suosituimmat</h2>
          <div className="product-cards">
            <h3>Tuotteita ei löytynyt</h3>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main>
      <section>
        <h2>Suosituimmat</h2>
        <div className="product-cards">
          {products.map((item) => {
            return (
              <ProductCard
                key={item.id}
                discountPercentage={discountPercentage}
                cartBtn={true}
                {...item}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};
export default Tuotenostot;
