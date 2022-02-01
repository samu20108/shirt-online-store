import "./App.css";
import Header from "./VerkkokauppaHeader.js";
import Content from "./Tuotenostot.js";
import Footer from "./VerkkokauppaFooter.js";
import { AppProvider } from "./context";

function App() {
  return (
    <AppProvider>
      <Header />
      <Content />
      <Footer />
    </AppProvider>
  );
}

export default App;
