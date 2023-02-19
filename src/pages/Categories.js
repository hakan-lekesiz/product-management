import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modals/defaultModal";
const editIcon = require('../content/img/edit.png');


const initialFormData = {
    id: "",
    name: "",
};


const Categories = () => {
    const [list, setList] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("categoryList")) {
            setList(JSON.parse(localStorage.getItem("categoryList")));
        }
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (formData.name) {
            //kategori eklenecek

            if (formData.id) {
                //id varsa düzenle işlemi yapılıyor
                let editedList = [
                    ...list.filter(x => x.id !== formData.id),
                    formData
                ];

                setList(editedList);
                localStorage.setItem("categoryList", JSON.stringify(editedList));
            }
            else {

                //ekleme işlemi yapılıyor

                const biggestElemId = list.length > 0 ? list.sort((a, b) => b.id - a.id)[0].id : 0;

                let newList = [
                    ...list,
                    {
                        ...formData,
                        id: biggestElemId + 1
                    }
                ];

                setList(newList);
                localStorage.setItem("categoryList", JSON.stringify(newList));
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

    const removeCategory = () => {
        const deletedList = [...list.filter(x => x.id !== formData.id)]
        setList(deletedList);
        localStorage.setItem("categoryList", JSON.stringify(deletedList));
        setShowDeleteModal(false);
        resetForm();
    };

    return (
        <>
            <div className="list-header">
                <h1>
                    Kategori Listesi
                </h1>
                <a href="#" onClick={() => {
                    setShowModal(true);
                    setFormData(initialFormData);
                }}>
                    Ekle
                </a>
            </div>


            <div className="list">
                <ul className="header">
                    <li>Sıra</li>
                    <li>Id</li>
                    <li className="flex-1">Kategori Adı</li>
                    <li>Aksiyonlar</li>
                </ul>

                {
                    list.sort((a, b) => a.id - b.id).map((category, index) => (
                        <ul key={category.id}>
                            <li>{index + 1}</li>
                            <li>{category.id}</li>
                            <li className="flex-1">
                                <Link to={"/urunler?ctg=" + category.id}> {category.name}</Link>
                            </li>
                            <li className="action-buttons">
                                <a href="#" onClick={() => {
                                    setShowModal(true);
                                    setFormData(category);
                                }}>
                                    <img src={"/images/edit.png"} />
                                </a>
                                <a onClick={() => {
                                    setShowDeleteModal(true);
                                    setFormData(category);
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
                        Kategori Bulunamadı lütfen bir kategori
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

                        <div className={formSubmitted && formData.name === "" ? "error" : ""}>
                            <label>
                                Kategori Adı
                            </label> <br />
                            <input type="text" value={formData.name} name="name" onChange={handleInputChange} />
                            {
                                formSubmitted && formData.name === "" &&
                                <div>Zorunlu Alan</div>
                            }

                        </div>

                        <hr />
                        <div>
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
                            Kişiyi silmek istediğinizden emin misin?
                        </h3>
                        <div className="removeButtons">
                            <button onClick={removeCategory}>Evet</button>
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

export default Categories;
