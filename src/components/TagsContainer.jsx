"use client";

import Tag from "./Tag";

export default function TagsContainer({ tags }) {
  if (!localStorage.getItem("selectedTags")) {
    localStorage.setItem("selectedTags", []);
  }
  console.log(tags);
  return (
    <div className="flex sm:mb-24 mb-12 justify-center flex-wrap gap-3">
      {tags.map((tag) => {
        return <Tag name={tag.tag_name} id={tag.id} />;
      })}
    </div>
  );
}
