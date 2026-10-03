import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div>
      <button className="btn" onClick={handleLike}>
        {liked ? "👎 Unlike" : "👍 Like"}
      </button>
    </div>
  );
}
