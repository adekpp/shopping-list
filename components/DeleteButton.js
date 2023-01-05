import { useState } from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

const initState = <AiOutlineDelete className="text-red-500 text-xl" />;

const DeleteButton = (props) => {
  const [icon, setIcon] = useState(initState);
  return (
    <button
      onClick={props.onclick}
      onMouseEnter={() =>
        setIcon(<AiFillDelete className="text-red-500 text-xl" />)
      }
      onMouseLeave={() => setIcon(initState)}
    >
      {icon}
    </button>
  );
};
export default DeleteButton;
