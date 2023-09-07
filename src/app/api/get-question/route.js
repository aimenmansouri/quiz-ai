import { useRouter } from "next/navigation";
import { OpenAIApi } from "openai";

export async function POST(request) {
  const body = await request.json();
  const tag = body.tag;

  let questionObject = {
    question: `${Date.now()}`,
    choices: ["A", "B", "C", "D"],
    correct_answer: "C",
    category: "CAT",
    difficulty_level: "LVL",
  };

  //return new Response(JSON.stringify(questionObject));

  const key = process.env.OPENAI_API_KEY;
  let rand = Math.random * 100;
  const question = `${rand} Generate a easy or medium difficulty ${tag} question with 4 answer choices
                    question_data = {
                            "question": generated_question,
                            "choices": choices,
                            "correct_answer": correct_answer,
                            "category": category,
                            "difficulty_level": difficulty
                        }
                        return json only no extra text use this template`;

  const prompt = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: question,
      },
    ],
  };
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(prompt),
    next: { revalidate: 10 },
  });

  const data = await res.json();
  console.log(data.choices[0].message.content);
  console.log(1231321231321321321321313132132);
  return new Response(data.choices[0].message.content);
}
