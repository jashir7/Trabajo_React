import "./Header.css";
import SENA_LOGO from "../assets/SENA_LOGO.webp";
function Header() {
  return (
    <header className="Header">
      <div className="Header-brand">
        <h1 className="Title">Centro Nacional Colombo Alemán</h1>
        <p className="Par">Formación para el futuro</p>
        
      </div>
      <img src={SENA_LOGO} alt="Logo SENA" className="Header-logo" />
      </header>
      
  );

}
//a
export default Header;