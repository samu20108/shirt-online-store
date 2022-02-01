import { useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  IoShirtOutline,
  IoBagOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import SignIn from "./Kirjautuminen.js";
import { useGlobalContext } from "./context";
import Cart from "./Pikaostoskori.js";

const VerkkokauppaHeader = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [accountTitle, setAccountTitle] = useState("Kirjaudu");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemAmount, checkCartTotal } = useGlobalContext();

  const toggleShowLinks = () => {
    if (!showLinks) {
      setShowLinks(true);
    } else {
      setShowLinks(false);
    }
  };
  const openModal = () => {
    if (showLinks) {
      setShowLinks(false);
    }
    setIsModalOpen(true);
  };
  const openCart = () => {
    if (showLinks) {
      setShowLinks(false);
    }
    checkCartTotal();
    setIsCartOpen(true);
  };

  return (
    <>
      <SignIn
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        accountTitle={accountTitle}
        setAccountTitle={setAccountTitle}
      />
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <nav className="navbar">
        <div className="center">
          <div className="space-between">
            <div className="left btn-group">
              <div className="toggle-btn" onClick={toggleShowLinks}>
                <FaBars />
              </div>
              <div className="logo">
                <button>
                  PAITA
                  <IoShirtOutline className="shirt-icon" />
                  NET
                </button>
              </div>
            </div>

            <div
              className={`${
                showLinks ? "links-container show-links" : "links-container"
              }`}
            >
              <ul className="links">
                <li>
                  <button className="women">
                    Naiset<div className="underline"></div>
                  </button>
                </li>
                <li>
                  <button className="men">
                    Miehet<div className="underline"></div>
                  </button>
                </li>
                <li>
                  <button className="kids">
                    Lapset
                    <div className="underline"></div>
                  </button>
                </li>
              </ul>
            </div>
            <div className="right btn-group">
              <button className="account-btn" onClick={openModal}>
                <div className="uprow">
                  {accountTitle}
                  <IoPersonCircleOutline className="account-icon" />
                </div>
                <div className="underline"></div>
              </button>
              <button className="cart-btn" onClick={openCart}>
                <div className="uprow">
                  Ostoskori
                  {itemAmount ? (
                    <span className="cartCount">{itemAmount}</span>
                  ) : null}
                  <IoBagOutline
                    className="
                      cart-icon"
                  />
                </div>
                <div className="underline"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default VerkkokauppaHeader;
