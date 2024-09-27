"use client";

import { setCookie } from "cookies-next";
import { useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

const tabOptions = [1, 2, 3, 4, 5];

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3], currentTab = 1 }: Props) => {
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedCookie", tab.toString());
  };

  return (
    <div
      className={"grid w-full grid-cols-5 space-x-2 rounded-xl bg-gray-200 p-2"}
    >
      {tabOptions.map(tab => (
        <div key={tab}>
          <input
            checked={selected === tab}
            type="radio"
            id={tab.toString()}
            onChange={() => {}}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition transition-old block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab.toString()}
          </label>
        </div>
      ))}
    </div>
  );
};
