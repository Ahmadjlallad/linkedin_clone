import Image from "next/image";
import React, { ReactElement } from "react";
import HeaderLink from "../components/HeaderLink";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";
interface Props {
  providers: ClientSafeProvider;
}

function Home({ providers }: Props): ReactElement {
  return (
    <div className="space-y-10 relative">
      <Head>
        <title>Linkedin</title>
        <meta name="description" content="Linked in Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-10">
          <Image
            src="https://rb.gy/vtbzlp"
            layout="fill"
            objectFit="contain"
            alt="logo"
          />
        </div>
        {/* sm brake point */}
        {/* divide make a border between */}
        <div className="flex items-center sm:divide-x divide-gray-300">
          {/* space-x-8  */}
          {/* pr-[customs values]  */}
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <div className="pl-4">
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className="text-blue-700 front-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                >
                  sign in
                </button>
              </div>
            </div>
          ))}
        </div>
      </header>
      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800 max-w-xl !leading-snug pl-4 xl:pl-0">
            welcome to your professional
          </h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
          <Image src="https://rb.gy/vkzpzt" layout="fill" priority alt="hero" />
          {/*priority prevent lazy loading  */}
        </div>
      </main>
    </div>
  );
}

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return { props: { providers } };
};
