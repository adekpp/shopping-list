import { useEffect, useState } from "react";

export const ProgressBar = ({ items }) => {
  const [statusBarPercent, setStatusBarPercent] = useState(0);
  const itemsDone = () => {
    const itemsDone = [];
    items.forEach((item) => {
      if (item.isDone) {
        itemsDone.push(item);
      }
    });
    return itemsDone.length;
  };
  useEffect(() => {
    percentCompleted();
  });
  const percentCompleted = () => {
    if (items.length) {
      const done = itemsDone();

      const width = Math.round((done / items.length) * 100);
      setStatusBarPercent(width);
    } else {
      return 0;
    }
  };
  return (
    <div className="w-full h-[10px] bg-gray-300 rounded-full">
      <div
        className="bg-green-600 text-xs font-medium text-center p-0.5 leading-none rounded-full h-[10px]"
        style={{ width: statusBarPercent + "%" }}
      ></div>
    </div>
  );
};
