import type { NextPage } from "next";

import Header from "../components/Header";
import { Footer } from "../components/Footer";
import Head from "next/head";
import NoteList from "../components/NoteList";

const Home: NextPage = () => {
  return (
    <div className="px-2 mx-2 md:max-w-screen-lg md:mx-auto">
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <title>CHRONotes</title>
      </Head>

      <Header />

      <main>
        <NoteList />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
