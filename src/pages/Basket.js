import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addItemToBasket } from '../store/features/basket/basketSlice';
import { decrement, increment } from '../store/features/counter/counterSlice'


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
                    basket && basket.items.map((product) => (
                        <ul key={product.id} className="d-flex">

                            <li className='clamp-1'>{product.name}</li>

                            <li style={{marginLeft:"20px"}}>
                                <button
                                    aria-label="Increment value"
                                    onClick={() => dispatch(increment())}
                                >
                                    -
                                </button>
                                <span style={{margin:"0 8px"}}>{product.count}</span>
                                <button
                                    aria-label="Decrement value"
                                    onClick={() => dispatch(decrement())}
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
