import { SearchInput } from "@/components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute flex justify-center items-center left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      <div className=" flex justify-center items-center flex-col">
      <div className="flex justify-center items-center w-full h-full flex-col mt-56">
        {/* <Image src="/logo.svg" width={100} height={100} alt="OPNHUB" /> */}
        <h1 className="text-4xl font-semibold text-primary">OPNHUB</h1>
        <p className="max-w-[450px] text-center my-3">
        Discover open-source projects from GitHub, categorized by programming language, with this intuitive web app.
        </p>
      </div>
      <Link className="absolute top-10 right-10" href="https://www.producthunt.com/posts/opnhub?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-opnhub" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=485687&theme=light" alt="OPNHUB - Discover&#0032;open&#0045;source&#0032;projects&#0032;from&#0032;GitHub | Product Hunt" style={{width: '200px', height: '44px'}} width="250" height="54" /></Link>
        <div className="flex flex-col gap-4 my-5 relative">
          {/* <Input placeholder="Type your language" /> */}
        <SearchInput/>
        </div>
      </div>
    </div>
    </>
  );
}
