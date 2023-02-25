import { Outlet } from "react-router-dom";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const Layout = () => {
    const theme = useSelector((state) => state.theme);

    return (
        <div className={"page-container " + (theme.mode === "light" ? "light" : "dark")} >
            <Header />

            <main>

                <AsideMenu />

                <div className="content">
                    <Outlet />
                </div>

            </main>

        </div>
    )
};

export default Layout;