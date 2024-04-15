import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../reduct/slice/counter.slice";

function Counter(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);

  console.log(count);
  const handleInc = () => {
    dispatch(increment());
  };

  const handleDec = () => {
    dispatch(decrement());
  };
  return (
    <div>
      <button onClick={handleInc}>+</button>
      {count.Counter}
      <button onClick={handleDec}>-</button>
    </div>
  );
}

export default Counter;
