
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header className="header-01">
            <nav className="c-wrapper">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/kategoriler">Kategoriler</Link>
                    </li>
                    <li>
                        <Link to="/urunler">Urunler</Link>
                    </li>
                </ul>
            </nav>

        </header>
    );
}

export default Header;
