import { Outlet } from "react-router-dom";
import AsideMenu from "../components/AsideMenu";
import Header from "../components/Header";

const Layout = () => {

    return (
        <>
            <Header />

            <main>

                <AsideMenu />

                <div className="content">
                    <Outlet />
                </div>

            </main>

        </>
    )
};

export default Layout;