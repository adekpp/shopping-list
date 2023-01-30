import { useState } from "react";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

const initState = <AiOutlineDelete className="text-red text-xl" />;

const DeleteButton = ({ ...props }) => {
  const [icon, setIcon] = useState(initState);
  return (
    <button
      className="active:scale-90 border-[1px] border-grey rounded-full p-2  border-opacity-0 active:border-opacity-25 active:border-grey"
      {...props}
      onMouseEnter={() =>
        setIcon(<AiFillDelete className="text-red text-xl" />)
      }
      onMouseLeave={() => setIcon(initState)}
    >
      <div>{icon}</div>
    </button>
  );
};
export default DeleteButton;
