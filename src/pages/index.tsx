import type { NextPage } from "next";
import { FiAlertTriangle, FiPlus } from "react-icons/fi";

import Note from "../components/Note";
import { useNotes } from "../utils/use-notes";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import Head from "next/head";

const Home: NextPage = () => {
  const { notes, addNote, changeNote, deleteNote } = useNotes();

  return (
    <div className="px-2 mx-2 md:max-w-screen-lg md:mx-auto">
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <title>CHRONotes</title>
      </Head>

      <Header />

      <main>
        {notes.length ? (
          <div className="mt-2">
            <div className="flex flex-row items-center">
              <h1 className="my-2 text-3xl">All Notes</h1>
              <button
                className="ml-auto p-2 text-xl border-0 rounded-full text-gray-50 bg-gray-900 dark:bg-gray-50 dark:text-gray-900 hover:bg-slate-600 dark:hover:bg-slate-400"
                type="button"
                onClick={() => addNote([])}
              >
                <FiPlus />
              </button>
            </div>

            {notes.map((note) => (
              <Note
                note={note}
                changeNote={changeNote(note.id)}
                key={note.id}
                deleteNote={deleteNote(note.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-2 border rounded h-96 dark:border-gray-600">
            <FiAlertTriangle className="mb-4 text-3xl text-red-600 dark:fill-red-600 dark:text-white" />
            <h1>No notes yet</h1>
            <h3>Add some notes to get started!</h3>
            <button
              className="p-2 text-xl border-0 rounded-full text-gray-50 bg-gray-900 dark:bg-gray-50 dark:text-gray-900 hover:bg-slate-600 dark:hover:bg-slate-400"
              type="button"
              onClick={() => addNote([])}
            >
              <FiPlus />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
