import TagsContainer from "@/components/TagsContainer";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export default async function page() {
  const prisma = new PrismaClient();
  const tags = await prisma.Tag.findMany();

  const play = () => {};
  return (
    <div className=" flex items-end flex-grow">
      <div className="mx-auto sm:mb-48 mb-12">
        <TagsContainer tags={tags} />
        <div className="flex justify-center">
          <div className="rounded-full bg-slate-800  p-3 drop-shadow-lg">
            <div className="rounded-full  bg-slate-700 p-3 drop-shadow-lg">
              <Link href="/play">
                <button
                  className=" justify-center rounded-full  p-3 bg-[#fd9f02]  drop-shadow-lg
            hover:scale-110 hover:bg-[#fdab20] transition-all duration-300 hover:-rotate-90"
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
