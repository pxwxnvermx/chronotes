import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { debounce } from "lodash";
import { KeyboardEvent, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { FiAlertTriangle, FiHeart } from "react-icons/fi";
import { OutputBlockData } from "@editorjs/editorjs";

import Note from "../components/Note";
import { useNotes } from "../utils/use-notes";
import Header from "../components/Navbar";
const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

const Home: NextPage = () => {
  const { notes, addNote, changeNote, deleteNote } = useNotes([]);
  const [content, setContent] = useState<OutputBlockData[]>([]);

  return (
    <div className="px-2 mx-2 md:max-w-screen-lg md:mx-auto">
      <Header />

      <main>
        <div className="mt-2">
          <Editor
            className="border rounded p-2 dark:border-gray-600"
            value={content}
            holder="main-editor"
            onChange={debounce(async (api) => {
              const changeData = await api.saver.save();
              setContent(changeData.blocks);
            }, 300)}
            addNote={(e: KeyboardEvent<HTMLDivElement>, editor: EditorJS) => {
              if (e.ctrlKey && e.key === "Enter") {
                addNote(content);
                setContent([]);
                editor.clear();
              }
            }}
          />
        </div>
        {notes.length ? (
          <div className="mt-2">
            <h1 className="my-2 text-3xl">All Notes</h1>
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
          <div className="mt-2 flex flex-col items-center justify-center h-96 border rounded dark:border-gray-600">
            <FiAlertTriangle className="text-red-600 dark:fill-red-600 dark:text-white text-3xl mb-4" />
            <h1>No notes yet</h1>
            <h3>Add some notes to get started!</h3>
          </div>
        )}
      </main>

      <footer>
        <nav className="text-center mt-6 mb-3">
          <h3 className="text-sm flex items-center justify-center">
            Made with
            <FiHeart className="ml-2 inline-block fill-red-600 text-red-600 text-xl animate-pulse" />
          </h3>
          <h3>Chronotes</h3>
        </nav>
      </footer>
    </div>
  );
};

export default Home;
