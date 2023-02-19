import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../components/Modals/defaultModal';

const initialFormData = {
    id: "",
    name: "",
    imgs: [],
    description: "",
    price: "",
    category: "",
};


const Products = () => {
    const [list, setList] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState(null);

    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const queryCategoryId = query.get('ctg');


    let categories = [];
    if (localStorage.getItem("categoryList")) {
        categories = JSON.parse(localStorage.getItem("categoryList"));
    }


    useEffect(() => {
        if (localStorage.getItem("productList")) {
            setList(JSON.parse(localStorage.getItem("productList")));
        }

        if (queryCategoryId) {
            //kategorilerden birine tıklayıp gelme senaryosu
            setSelectedCategory(queryCategoryId);
            filterByCategoryId(queryCategoryId);
        }

    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        const _list = JSON.parse(localStorage.getItem("productList"));

        if (formData.name) {


            if (formData.id) {
                //id varsa düzenle işlemi yapılıyor
                let editedList = [
                    ..._list.filter(x => x.id !== formData.id),
                    formData
                ];

                setList(editedList);
                localStorage.setItem("productList", JSON.stringify(editedList));
            }
            else {

                //ekleme işlemi yapılıyor

                const biggestElemId = _list.length > 0 ? _list.sort((a, b) => b.id - a.id)[0].id : 0;

                let newList = [
                    ..._list,
                    {
                        ...formData,
                        id: biggestElemId + 1
                    }
                ];

                setList(newList);
                localStorage.setItem("productList", JSON.stringify(newList));
            }
            setShowModal(false);
            resetForm();
        }



    };

    const resetForm = () => {
        setFormData(initialFormData);
        setFormSubmitted(false);
    };

    const handleInputChange = (e) => {
        if (e.target.type === "checkbox" || e.target.type === "radio") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.checked
            });
        }
        else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const removeProduct = () => {
        const _list = JSON.parse(localStorage.getItem("productList"));
        const deletedList = [..._list.filter(x => x.id !== formData.id)];
        setList(deletedList);
        localStorage.setItem("productList", JSON.stringify(deletedList));
        setShowDeleteModal(false);
        resetForm();
    };

    const getCategoryName = (id) => {
        return categories.find(x => x.id === parseInt(id)).name;
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        filterByCategoryId(e.target.value);
    };

    const filterByCategoryId = (ctgId) => {
        const _list = JSON.parse(localStorage.getItem("productList"));
        if (ctgId) {
            //bir kategori seçilmiş ise
            const filteredList = [..._list.filter(x => x.category == ctgId)];
            setList(filteredList);

        }
        else {
            //kategori seçilmemiş
            setList(_list);
        }
    }

    return (
        <>
            <div className="list-header">
                <h1>
                    Ürün Listesi
                </h1>
                <div className='right-side'>

                    <select name='category' value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Kategori Seçiniz</option>
                        {
                            categories.map((ctg) => (
                                <option value={ctg.id}>{ctg.name}</option>
                            ))
                        }
                    </select>

                    <a className='add-btn' href="#" onClick={() => {
                        setShowModal(true);
                        setFormData(initialFormData);
                    }}>
                        Ekle
                    </a>
                </div>
            </div>

            <div className="list">
                <ul className="header">
                    <li>Sıra</li>
                    <li>Ürün Adı</li>
                    <li>Görseller</li>
                    <li className="flex-1">Açıklama</li>
                    <li>Kategori</li>
                    <li>Fiyat</li>
                    <li>Asiyonlar</li>
                </ul>

                {
                    list.sort((a, b) => a.id - b.id).map((product, index) => (
                        <ul key={product.id}>
                            <li>{index + 1}</li>
                            <li className='clamp-1'>{product.name}</li>

                            <li className='img-container'>
                                {product.imgs.length > 0 && product.imgs.map((img) => (
                                    <img src={img} />
                                ))}
                            </li>

                            <li className="flex-1 clamp-1">{product.description}</li>
                            <li>{getCategoryName(product.category)}</li>
                            <li>{product.price}</li>

                            <li className="action-buttons">
                                <a href="#" onClick={() => {
                                    setShowModal(true);
                                    setFormData(product);
                                }}>
                                    <img src={"/images/edit.png"} />
                                </a>
                                <a onClick={() => {
                                    setShowDeleteModal(true);
                                    setFormData(product);
                                }} href="#">
                                    <img src={require('../content/img/delete.png')} />
                                </a>
                            </li>
                        </ul>
                    ))
                }
                {
                    list.length === 0 &&
                    <div className="not-result">
                        Ürün Bulunamadı lütfen bir ürün
                        <a href="#" onClick={() => {
                            setShowModal(true);
                            setFormData(initialFormData);
                        }}>ekleyin</a>
                    </div>
                }

            </div>

            {
                showModal &&
                <Modal closeModal={() => { setShowModal(false); resetForm(); }}>
                    <form onSubmit={handleFormSubmit}>
                        <div className='d-flex'>
                            <div style={{ width: "300px" }} className={formSubmitted && formData.category === "" ? "error" : ""}>
                                <label>
                                    Kategori
                                </label> <br />

                                <select name='category' value={formData.category} onChange={handleInputChange}>
                                    <option value="">Seçiniz</option>
                                    {
                                        categories.map((ctg) => (
                                            <option value={ctg.id}>{ctg.name}</option>
                                        ))
                                    }
                                </select>

                                {
                                    formSubmitted && formData.category === "" &&
                                    <div>Zorunlu Alan</div>
                                }

                            </div>

                            <div style={{ width: "300px" }} className={formSubmitted && formData.name === "" ? "error" : ""}>
                                <label>
                                    Ürün Adı
                                </label> <br />
                                <input type="text" value={formData.name} name="name" onChange={handleInputChange} />
                                {
                                    formSubmitted && formData.name === "" &&
                                    <div>Zorunlu Alan</div>
                                }

                            </div>
                        </div>


                        <hr />

                        <div className={"form-img-container" + (formSubmitted && formData.imgs.length === 0 ? " error" : "")}>
                            <label>
                                Görseller
                            </label> <br /><br />
                            {
                                formData.imgs.map((img, index) => (
                                    <div className='d-flex input-container'>
                                        <input type="text" value={img}
                                            onChange={(e) => {
                                                let newImgs = [...formData.imgs];
                                                newImgs[index] = e.target.value;

                                                setFormData({
                                                    ...formData,
                                                    imgs: newImgs
                                                });
                                            }}
                                        />
                                        <a href='#' onClick={() => {
                                            setFormData({
                                                ...formData,
                                                imgs: [...formData.imgs.filter(x => x !== img)]
                                            });
                                        }}>
                                            <img src={require('../content/img/delete.png')} />
                                        </a>

                                    </div>
                                ))
                            }

                            <div>
                                <a href='#' onClick={() => {
                                    setFormData({
                                        ...formData,
                                        imgs: [...formData.imgs, ""]
                                    })


                                }}>Ekle</a>
                            </div>

                            {
                                formSubmitted && formData.imgs.length === 0 &&
                                <div>Zorunlu Alan</div>
                            }

                        </div>

                        <hr />


                        <div className='d-flex'>
                            <div style={{ width: "300px" }} className={formSubmitted && formData.description === "" ? "error" : ""}>
                                <label>
                                    Ürün Açıklaması
                                </label> <br />

                                <textarea name="description" value={formData.description} onChange={handleInputChange}>

                                </textarea>

                                {
                                    formSubmitted && formData.description === "" &&
                                    <div>Zorunlu Alan</div>
                                }

                            </div>


                            <div style={{ width: "300px" }} className={formSubmitted && formData.price === "" ? "error" : ""}>
                                <label>
                                    Ürün Fiyatı
                                </label> <br />
                                <input type="text" value={formData.price} name="price" onChange={handleInputChange} />
                                {
                                    formSubmitted && formData.price === "" &&
                                    <div>Zorunlu Alan</div>
                                }

                            </div>
                        </div>


                        <hr />


                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button type="submit">Kaydet</button>
                        </div>


                    </form>
                </Modal>
            }

            {
                showDeleteModal &&
                <Modal closeModal={() => setShowDeleteModal(false)}>
                    <div>
                        <h3>
                            Ürünü silmek istediğinizden emin misin?
                        </h3>
                        <div className="removeButtons">
                            <button onClick={removeProduct}>Evet</button>
                            <button onClick={() => {
                                setShowDeleteModal(false);
                                setFormData(null);
                            }
                            }>Hayır</button>
                        </div>
                    </div>
                </Modal>
            }

        </>
    );
}

export default Products;
