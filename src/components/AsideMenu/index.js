
import { Outlet, Link } from "react-router-dom";

const AsideMenu = () => {

    return (
        <div id="aside-menu">
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

        </div>
    );
}

export default AsideMenu;
