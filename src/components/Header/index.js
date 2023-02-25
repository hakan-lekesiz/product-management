
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchParam } from "../../store/features/filter/filterSlice";
import { toggleTheme } from "../../store/features/theme/themeSlice";
import { setEmail, setName, setLastName } from "../../store/features/user/userSlice";

const Header = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const searchParam = useSelector((state) => state.filter.searchParam);
    const basket = useSelector((state) => state.basket);
    const count = useSelector((state) => state.counter.value);
    const theme = useSelector((state) => state.theme);


    const login = () => {
        dispatch(setName("Hakan"));
        dispatch(setLastName("Lekesiz"));
        dispatch(setEmail("hakan.lekesiz@gmail.com"));
    };


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
            <div className="d-flex" style={{ alignItems: "center", gap: "12px" }}>

                <div className="basket-container">
                    <Link to="/sepet">
                        <div style={{ background: "red", padding: "8px" }}>

                            <img style={{ width: "28px" }} src={"https://cdn-icons-png.flaticon.com/512/3721/3721818.png"} />
                        </div>
                    </Link>


                    {
                        basket.items.length > 0 &&
                        <span>{basket.items.length}</span>
                    }
                </div>


                <input type="text" value={searchParam} onChange={(e) => dispatch(setSearchParam(e.target.value))} placeholder="Ara..." />

                {
                    user.name && (user.name + " " + user.lastName)
                }

                {
                    !user.name &&
                    <button onClick={login}>
                        Giriş Yap
                    </button>
                }

                <button className="mode-icon"
                    onClick={() => {
                        dispatch(toggleTheme())
                        localStorage.setItem("theme", (theme.mode === "dark" ? "light" : "dark"));
                    }}
                >
                    {
                        theme.mode === "dark" &&
                        <img style={{ width: "28px" }} src="https://cdn2.iconfinder.com/data/icons/user-interface-vol-2-14/48/brightness-light-up-day-mode-512.png" />
                    }
                    {
                        theme.mode === "light" &&
                        <img style={{ width: "28px" }} src="https://cdn-icons-png.flaticon.com/512/6714/6714978.png" />
                    }

                </button>
            </div>

        </header >
    );
}

export default Header;
