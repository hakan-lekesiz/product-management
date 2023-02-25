import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addItemToBasket } from '../store/features/basket/basketSlice';


const Basket = () => {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basket);


    useEffect(() => {
        const _basket = JSON.parse(localStorage.getItem("basket"));
        if (_basket) {
            dispatch(addItemToBasket(_basket));
        }
    }, []);

    return (
        <>


            <div>

                {
                    basket && [...basket.items].sort((a, b) => b.sortNumber - a.sortNumber).map((product) => (
                        <ul key={product.id} className="d-flex">

                            <li className='clamp-1'>{product.name}</li>

                            <li style={{ marginLeft: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                                <button
                                    aria-label="Decrement value"
                                    onClick={() => {
                                        let updatedBasketItems = [];

                                        if (product.count === 1) {
                                            updatedBasketItems = [
                                                ...basket.items.filter(x => x.id !== product.id)
                                            ];
                                        }
                                        else {
                                            updatedBasketItems = [
                                                ...basket.items.filter(x => x.id !== product.id),
                                                {
                                                    ...product,
                                                    count: product.count - 1
                                                }
                                            ];
                                        }

                                        dispatch(addItemToBasket(updatedBasketItems));
                                        localStorage.setItem("basket", JSON.stringify(updatedBasketItems));
                                    }}
                                >
                                    -
                                </button>
                                <span>{product.count}</span>
                                <button
                                    aria-label="Increment value"
                                    onClick={() => {

                                        // let updatedBasketItems = [
                                        //     ...basket.items.filter(x => x.id !== product.id),
                                        //     {
                                        //         ...product,
                                        //         count: product.count + 1
                                        //     }
                                        // ];

                                        var _updatedProduct = { ...product };
                                        _updatedProduct.count = _updatedProduct.count + 1;

                                        const updatedItemIndex = basket.items.findIndex(x => x.id === product.id);
                                        let _items = [...basket.items];
                                        _items[updatedItemIndex] = _updatedProduct;

                                        dispatch(addItemToBasket(_items));
                                        localStorage.setItem("basket", JSON.stringify(_items));

                                    }}
                                >
                                    +
                                </button>
                                <button
                                    aria-label="Deleted value"
                                    onClick={() => {

                                        let updatedBasketItems = [
                                            ...basket.items.filter(x => x.id !== product.id)
                                        ];

                                        dispatch(addItemToBasket(updatedBasketItems));
                                        localStorage.setItem("basket", JSON.stringify(updatedBasketItems));
                                    }}
                                >
                                    <img width={24} height={24} src="data:image/png;base64,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"></img>
                                </button>

                                <div>
                                    {product.count * Number(product.price)}
                                </div>
                            </li>
                        </ul>
                    ))
                }

                <div>
                    Toplam : { 

                    basket.items.reduce((toplam, product) => {
                        return toplam + product.count * Number(product.price);
                      }, 0)
                    }

                </div>
            </div>

        </>
    );
}

export default Basket;
