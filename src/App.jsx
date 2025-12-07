import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Main/Popup/Popup.jsx";




function App() {
  return (
    <div className="page">
      <div className="page__content">

       <Header />   {/* ← AQUÍ FALTABA */}
       <Main /> 
       <Footer />
       

        

        

      </div>
    </div>
  );
}

export default App;
