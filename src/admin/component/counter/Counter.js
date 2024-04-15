import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../reduct/slice/counter.slice";

function Counter(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  console.log(count);

  const handleInc = () => {
    dispatch(increment());
  };

  const handleDec = () => {
    dispatch(decrement());
  };
  return (
    <div>
      <h1>counter</h1>
      <button onClick={handleInc}>+</button>
      {count}
      <button onClick={handleDec}>-</button>
    </div>
  );
}

export default Counter;
