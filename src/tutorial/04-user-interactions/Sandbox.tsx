import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Sandbox = () => {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    setCount(count - 1);
  };
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Count: {count}</h2>
      <button
        onClick={handleIncrease}
        className="bg-blue-400 text-white px-4 py-2 rounded mr-2"
      >
        Increase
      </button>
      <button
        onClick={handleDecrease}
        className="bg-red-400 text-white px-4 py-2 rounded"
      >
        Decrease
      </button>
      <div>
        {isLiked ? (
          <button
            onClick={handleToggleLike}
            aria-label="like button"
            className="block mx-auto text-2xl text-red-500 mt-16"
          >
            <FaHeart />
          </button>
        ) : (
          <button
            onClick={handleToggleLike}
            aria-label="unlike button"
            className="block mx-auto text-2xl text-red-500 mt-16"
          >
            <FaRegHeart />
          </button>
        )}
      </div>
    </div>
  );
};
export default Sandbox;
