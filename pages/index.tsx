import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import { connectToDatabase } from "../lib/mongodb";
import { Post, Articles, Location } from "../types";
import Widgets from "../components/Widgets";

interface Props {
  posts: Post[];
  newsArticles: Articles[];
}

/**
 * 
 const promisifiedGetPos = () =>
 new Promise((resolve, reject) => {
   navigator.geolocation.getCurrentPosition(
     (pos) => {
       resolve(pos);
      },
      (err) => {
        reject(`ERROR(${err.code}): ${err.message}`);
      }
      );
    });
*/

const Home: NextPage<Props> = ({ posts, newsArticles }) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType] = useRecoilState(modalTypeState);

  /*
  const newsArticles = useRef<any[]>(serverNewsArtic);
  useEffect(() => {
    async function getArticle() {
      try {
        // const fetchLocation = await fetch(
        //   `https://extreme-ip-lookup.com/json/?key=${process.env.NEXT_PUBLIC_LOCATION_API_KEY}`
        // );
        const userLocation = "ar";
        // const userLocation: Location = await fetchLocation.json();
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${userLocation}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        newsArticles.current = await res.json();
        console.log(userLocation);
        console.log(newsArticles.current);
      } catch (error) {
        console.log(error);
      }
    }
    getArticle();
  }, []);
  */
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
          <Feed posts={posts} />
        </div>
        <Widgets newsArticles={newsArticles} />
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
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("post")
    .find()
    .sort({ timestamp: -1 })
    .toArray();
  const serializePosts = posts.map(({ _id, timestamp, ...rest }) => ({
    ...rest,
    timestamp: timestamp.toString(),
    _id: _id.toString(),
  }));
  let anewsArticles =
    await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}
`);
  const newsArticles = await anewsArticles.json();
  // const fetchLocation = await fetch(
  //   `https://extreme-ip-lookup.com/json/?key=${process.env.LOCATION_API_KEY}`
  // );
  // const userLocation: Location = await fetchLocation.json();
  return {
    props: {
      posts: serializePosts,
      newsArticles: newsArticles.articles,
    },
  };
};

export default Home;
