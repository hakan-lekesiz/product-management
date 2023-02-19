import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../store/features/counter/counterSlice'


const Home = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value)

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
        </>
    );
}

export default Home;
