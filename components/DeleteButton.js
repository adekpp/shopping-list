import { useState } from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

const initState = <AiOutlineDelete className="text-red text-xl" />;

const DeleteButton = ({ ...props }) => {
  const [icon, setIcon] = useState(initState);
  return (
    <button
      {...props}
      onMouseEnter={() =>
        setIcon(<AiFillDelete className="text-red text-xl" />)
      }
      onMouseLeave={() => setIcon(initState)}
    >
      {icon}
    </button>
  );
};
export default DeleteButton;
