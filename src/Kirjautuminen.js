import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Kirjautuminen = ({
  isOpen,
  setIsOpen,
  accountTitle,
  setAccountTitle,
}) => {
  const [inputError, setInputError] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rememberInput, setRememberInput] = useState(true);
  const { loggedIn, setLoggedIn } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Checks if the input is correct
    if (usernameInput === "testi" && passwordInput === "testi") {
      setAccountTitle(usernameInput);
      setLoggedIn(true);
      setIsOpen(false);
      setInputError(false);
      if (!rememberInput) {
        setUsernameInput("");
        setPasswordInput("");
        setRememberInput(false);
      }
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 2000);
    }
  };
  const logout = () => {
    setLoggedIn(false);
    setAccountTitle("Kirjaudu");
    setIsOpen(false);
  };
  //Check if clicked outside
  const handleClick = (event) => {
    const target = event.target;
    if (target.classList.contains("overlay")) {
      setIsOpen(false);
    } else {
    }
  };
  if (loggedIn === false) {
    return (
      <div
        className={`${isOpen ? "overlay show-modal" : "overlay"}`}
        onClick={handleClick}
      >
        <div className="signin modal">
          <button className="del-btn" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
          <form onSubmit={handleSubmit}>
            <h3>Kirjaudu sisään</h3>
            <label htmlFor="name">Tunnus:</label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsernameInput(e.target.value)}
              value={usernameInput}
            ></input>
            <label htmlFor="amount">Salasana:</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPasswordInput(e.target.value)}
              value={passwordInput}
            ></input>
            <label htmlFor="remember">
              Muista minut:
              <input
                type="checkbox"
                name="remember"
                onChange={(e) => setRememberInput(e.target.checked)}
                checked={rememberInput}
              ></input>
            </label>
            <div className="error">
              {inputError ? (
                <p>{`Virheellinen käyttäjätunnus tai salasana.`}</p>
              ) : null}
            </div>

            <button className="btn" type="submit">
              Kirjaudu
            </button>
          </form>
        </div>
      </div>
    );
  }
  if (loggedIn === true) {
    return (
      <div className={`${isOpen ? "overlay show-modal" : "overlay"}`}>
        <div className="logged-in modal">
          <button className="del-btn" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
          <h3>Olet kirjautunut sisään tunnuksella:</h3>
          <h3>{accountTitle}</h3>
          <p>Tilaukset</p>
          <p>Asetukset</p>
          <button className="logout-btn btn" onClick={logout}>
            Kirjaudu ulos
          </button>
        </div>
      </div>
    );
  }
};
export default Kirjautuminen;
