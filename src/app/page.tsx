import { SearchInput } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "OPNHUB | Discover open-source projects from GitHub",
  description: "Discover open-source projects from GitHub, categorized by programming language, with this intuitive web app.",
};
export default function Home() {

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute flex justify-center items-center left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      <div className=" flex justify-center items-center flex-col">
      <div className="flex justify-center items-center w-full h-full flex-col mt-56">
        <h1 className="text-4xl font-semibold text-primary">OPNHUB</h1>
        <p className="max-w-[450px] text-center my-3">
        Discover open-source projects from GitHub, categorized by programming language, with this intuitive web app.
        </p>
      </div>
        <div className="flex flex-col gap-4 my-5 relative">
          {/* <Input placeholder="Type your language" /> */}
        <SearchInput/>
        </div>
      </div>
    </div>
  );
}
