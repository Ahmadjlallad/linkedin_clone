import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import Modal from "../components/Modal";

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType] = useRecoilState(modalTypeState);
  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed
          // posts={posts}
          />
        </div>
        {/* <Widgets articles={articles} /> */}
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // getSession for server side
  // useSession for client side
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/home", permanent: false } };
  }
  return {
    props: {
      session,
    },
  };
};
export default Home;
