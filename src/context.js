import { useState, useContext, createContext, useEffect } from "react";
import productData from "./products.json";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(new Map([]));
  const [cartTotal, setCartTotal] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [itemAmount, setItemAmount] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const products = productData;

  useEffect(() => {
    if (loggedIn) {
      setDiscountPercentage(0.2);
    } else {
      setDiscountPercentage(null);
    }
  }, [loggedIn]);

  const addItem = (id) => {
    if (cartItems.has(id)) {
      let amount = cartItems.get(id);
      const newCartItems = cartItems.set(id, amount + 1);
      setCartItems(newCartItems);
    } else {
      const newCartItems = cartItems.set(id, 1);
      setCartItems(newCartItems);
    }
    checkAmount();
  };
  const deleteItem = (id) => {
    let currentAmount = cartItems.get(id);
    const newCartItems = cartItems.set(id, currentAmount - 1);
    if (currentAmount < 1) {
      cartItems.delete(id);
    }
    setCartItems(newCartItems);
    checkAmount();
  };
  const checkAmount = () => {
    let newAmount = 0;
    for (const value of cartItems.values()) {
      newAmount += value;
    }
    setItemAmount(newAmount);
    checkCartTotal();
  };
  const checkCartTotal = () => {
    let newCartTotal = 0;
    products.map((item) => {
      if (cartItems.has(item.id)) {
        const amount = cartItems.get(item.id);
        newCartTotal += amount * (item.price - item.price * discountPercentage);
      }
      return newCartTotal;
    });
    setCartTotal(newCartTotal.toFixed(2));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cartItems,
        addItem,
        loggedIn,
        setLoggedIn,
        itemAmount,
        cartTotal,
        checkCartTotal,
        discountPercentage,
        deleteItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
