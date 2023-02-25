import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addItemToBasket } from '../store/features/basket/basketSlice';
import { decrement, increment } from '../store/features/counter/counterSlice'


const Home = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);
    const basket = useSelector((state) => state.basket);

    const list = JSON.parse(localStorage.getItem("productList")) || [];

    useEffect(() => {
        const _basket = JSON.parse(localStorage.getItem("basket"));
        if (_basket) {
            dispatch(addItemToBasket(_basket));
        }
    }, []);

    return (
        <>
            <div>
                <div>
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </button>
                    <span>{count}</span>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </button>
                </div>
            </div>

            <div>

                {
                    list.map((product) => (
                        <ul key={product.id} className="d-flex">

                            <li className='clamp-1'>{product.name}</li>

                            <li>
                                {
                                    !basket.items.some(x => x.id === product.id) &&

                                    <a href="#" onClick={() => {

                                        const newBasket = [
                                            {
                                                ...product,
                                                count: 1
                                            },
                                            ...basket.items
                                        ];

                                        dispatch(addItemToBasket(newBasket));
                                        localStorage.setItem("basket", JSON.stringify(newBasket));

                                    }
                                    }>
                                        <img style={{ width: "28px" }} src={"https://cdn-icons-png.flaticon.com/512/3721/3721818.png"} />
                                    </a>
                                }

                            </li>
                        </ul>
                    ))
                }

            </div>

        </>
    );
}

export default Home;
