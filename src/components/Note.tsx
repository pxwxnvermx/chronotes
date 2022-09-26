import { useState } from "react";
import { NoteType } from "../types";
import { FaTrash } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import Editor from "../components/Editor";

type Props = {
  note: NoteType;
  changeNote: (content: any) => void;
  deleteNote: () => void;
};

const Note = ({ note, deleteNote, changeNote }: Props) => {
  const [saving, setSaving] = useState(false);

  return (
    <div className="px-4 py-2 mb-2 border rounded border-zinc-200 dark:border-zinc-800">
      <div className="mb-2">
        <Editor
          value={note.content}
          changeNote={(content: any) => {
            setSaving(true);
            changeNote(content);
            setTimeout(() => {
              setSaving(false);
            }, 1000);
          }}
          className="px-4 py-2"
        />
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />
      <div className="md:flex flex-row items-center mt-2 text-sm">
        <div className="flex flex-col w-full ml-2">
          <div>#{note.id} </div>

          <div>
            {new Date(note.createdAt).toLocaleString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>

        <div className={saving ? "visible" : "invisible"}>
          <div className="flex flex-row">
            Saving
            <AiOutlineLoading className="mx-2 animate-spin inline-block" />
          </div>
        </div>

        <div>
          <button
            className="p-2 text-sm text-red-600 rounded-full hover:bg-gray-200 transition-color duration-300"
            onClick={deleteNote}
          >
            <FaTrash className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
