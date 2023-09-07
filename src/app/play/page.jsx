"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function play() {
  const [mem, setMem] = useState(null);
  useEffect(() => {
    let len = JSON.parse(localStorage.getItem("selectedTags")).length;
    let tag = JSON.parse(localStorage.getItem("selectedTags"))[
      Math.floor(Math.random() * len)
    ];
    fetch(`/api/get-question`, {
      method: "POST",
      body: JSON.stringify({
        tag: tag,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuest(data);
      });

    tag = JSON.parse(localStorage.getItem("selectedTags"))[
      Math.floor(Math.random() * len)
    ];
    fetch(`/api/get-question`, {
      method: "POST",
      body: JSON.stringify({
        tag: tag,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMem(data);
        console.log(data);
      });
  }, []);

  let questionObject = {
    question: "Loading...",
    choices: ["A", "B", "C", "D"],
    correct_answer: "X",
    category: "",
    difficulty_level: "LVL",
  };
  const [quest, setQuest] = useState(questionObject);

  const refs = Array.from({ length: 4 }, () => useRef(null));

  const validateAnswer = (answer, idx) => {
    const btn = refs[idx].current;
    btn.className =
      "w-full sm:text-2xl text-lg rounded-full border-2  sm:py-3 py-2 bg-slate-200 text-slate-900 transition-all duration-300";
    for (let i = 0; i < refs.length; i++) {
      const btn = refs[i].current;
      if (i != idx)
        btn.className =
          "w-full sm:text-2xl text-lg rounded-full border-2 border-slate-100 sm:py-3 py-2";
      btn.disabled = true;
    }
    //MAYBE FETCH THE NEW QUESTION HERE

    setTimeout(() => {
      if (answer == quest.correct_answer) {
        const btn = refs[idx].current;
        btn.className =
          "w-full sm:text-2xl text-lg rounded-full border-2  sm:py-3 py-2 bg-green-500 text-slate-900 transition-all duration-300";
      } else {
        const btn = refs[idx].current;
        btn.className =
          "w-full sm:text-2xl text-lg rounded-full border-2  sm:py-3 py-2 bg-red-500 text-slate-900 transition-all duration-300";
        const correctIdx = quest.choices.indexOf(quest.correct_answer);
        const correctBtn = refs[correctIdx].current;
        correctBtn.className =
          "w-full sm:text-2xl text-lg rounded-full border-2  sm:py-3 py-2 bg-green-500 text-slate-900 transition-all duration-300";
      }
    }, 1500);

    setTimeout(() => {
      for (let i = 0; i < refs.length; i++) {
        const btn = refs[i].current;
        btn.className =
          "w-full sm:text-2xl text-lg rounded-full border-2 border-slate-100 sm:py-3 py-2 hover:bg-slate-100 hover:text-slate-900 transition-all duration-300";
        btn.disabled = false;
      }

      setQuest(mem);

      let len = JSON.parse(localStorage.getItem("selectedTags")).length;
      let tag = JSON.parse(localStorage.getItem("selectedTags"))[
        Math.floor(Math.random() * len)
      ];
      fetch(`/api/get-question`, {
        method: "POST",
        body: JSON.stringify({
          tag: tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("mem fetched after answer");
          setMem(data);
          console.log(mem);
        });
    }, 4000);
  };
  return (
    <div className="flex flex-grow justify-center items-end sm:mb-48 mb-12">
      <div className="text-center flex-grow">
        <h2 className="text-2xl text-slate-300 mb-6">
          {quest.category} question
        </h2>
        <h1 className=" text-4xl mb-12">{quest.question}</h1>
        <div className="grid gap-4 sm:grid-cols-2 grid-cols-1 sm:w-full sm:mb-24 mb-12 w-2/3 mx-auto">
          {quest.choices.map((choice, idx) => {
            return (
              <div>
                <button
                  ref={refs[idx]}
                  id={"choice-" + idx}
                  onClick={() => validateAnswer(choice, idx)}
                  className="w-full sm:text-2xl text-lg rounded-full border-2 border-slate-100 sm:py-3 py-2 hover:bg-slate-100 hover:text-slate-900 transition-all duration-300"
                >
                  {choice}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <div className="rounded-full bg-slate-800  p-3 drop-shadow-lg">
            <div className="rounded-full  bg-slate-700 p-3 drop-shadow-lg">
              <Link href="/">
                <button
                  className=" justify-center rounded-full  p-3 bg-[#fd9f02]  drop-shadow-lg
                            hover:scale-110 hover:bg-[#fdab20] transition-all duration-300 hover:rotate-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2.5"
                    stroke="#1e293b"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
