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

                            <li style={{ marginLeft: "20px" }}>
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
                                <span style={{ margin: "0 8px" }}>{product.count}</span>
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

                                        let _updatedbasketItems = [...basket.items];
                                        const updatedItemIndex = _updatedbasketItems.findIndex(x => x.id === product.id);
                                        _updatedbasketItems[updatedItemIndex].count = _updatedbasketItems[updatedItemIndex].count + 1;

                                        dispatch(addItemToBasket(_updatedbasketItems));
                                        localStorage.setItem("basket", JSON.stringify(_updatedbasketItems));

                                    }}
                                >
                                    +
                                </button>
                            </li>
                        </ul>
                    ))
                }

            </div>

        </>
    );
}

export default Basket;
