import { useRef, useEffect, useState } from "react";
import { NoteType as NoteType } from "../types";
import { FaTrash } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});
import { debounce } from "lodash";

import { convertDataToHtml } from "../utils/editorHelpers";
import { OutputBlockData } from "@editorjs/editorjs";

type Props = {
  note: NoteType;
  changeNote: (content: OutputBlockData[]) => void;
  deleteNote: () => void;
};

const Note = ({ note, deleteNote, changeNote }: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contentRef.current)
      contentRef.current.innerHTML = convertDataToHtml(note.content);
  }, [note.content]);

  return (
    <div className="px-4 py-2 mb-2 border rounded dark:border-gray-600">
      <div className="mb-2">
        <Editor
          holder={note.id}
          value={note.content}
          onChange={debounce(async (api, e) => {
            setSaving(true);
            const changeData = await api.saver.save();
            changeNote(changeData.blocks);
            setTimeout(() => setSaving(false), 500);
          }, 300)}
        />
      </div>

      <hr className="dark:border-gray-600" />
      <div className="flex flex-row items-center mt-2 text-sm">
        <span className="flex-grow">
          #{note.id}{" "}
          {new Date(note.createdAt).toLocaleString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </span>

        {saving && (
          <div className="flex items-center" title="Saving...">
            Saving{" "}
            <AiOutlineLoading className="ml-1 animate-spin inline-block" />{" "}
          </div>
        )}

        <button
          className="p-2 text-sm text-red-600 rounded-full hover:bg-gray-200"
          onClick={deleteNote}
        >
          <FaTrash className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Note;
