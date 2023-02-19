import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Products from "./pages/Products";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/urunler" element={<Products />} />
          <Route path="/kategoriler" element={<Categories />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
