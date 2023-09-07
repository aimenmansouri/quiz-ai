"use client";

import { useState } from "react";

export default function Tag({ name, id }) {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("selectedTags").indexOf(name) != -1
  );
  const checkHandler = (e) => {
    if (e.target.checked) {
      const newTags = JSON.parse(localStorage.getItem("selectedTags"));
      newTags.push(name);
      localStorage.setItem("selectedTags", JSON.stringify(newTags));
      setIsChecked(true);
      console.log(localStorage.getItem("selectedTags"));
    } else {
      const newTags = JSON.parse(localStorage.getItem("selectedTags"));
      var index = newTags.indexOf(name);
      if (index !== -1) {
        newTags.splice(index, 1);
      }
      localStorage.setItem("selectedTags", JSON.stringify(newTags));
      setIsChecked(false);
      console.log(localStorage.getItem("selectedTags"));
    }
  };
  return (
    <div className="w-fit px-3 py-2 bg-slate-600 hover:bg-slate-700 transition-colors duration-50 rounded-full text-lg hover:cursor-pointer">
      <div className="exp">
        <input
          onChange={(e) => checkHandler(e)}
          type="checkbox"
          id={id}
          name="check"
          checked={isChecked}
        />
        <label htmlFor={id}>
          <span></span>
          {name}
        </label>
      </div>
    </div>
  );
}
