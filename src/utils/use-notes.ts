import { OutputBlockData } from "@editorjs/editorjs";
import { useState } from "react";
import { randomIdString } from "./helpers";
import { NoteType } from "../types";

export const useNotes = (initialNotes: NoteType[] = []) => {
  const [notes, setNotes] = useState(initialNotes);

  const addNote = (note: OutputBlockData[]) => {
    const newNotes = [
      ...notes,
      {
        id: randomIdString(),
        content: note,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ].sort((a, b) => b.createdAt - a.createdAt);
    setNotes(newNotes);
  };

  const changeNote = (id: string) => {
    return (content: OutputBlockData[]) => {
      setNotes(
        notes.map((note) => {
          if (note.id === id) {
            note.content = content;
            note.updatedAt = Date.now();
          }

          return note;
        }),
      );
    };
  };

  const deleteNote = (id: string) => {
    return () => {
      setNotes(notes.filter((note) => note.id !== id));
    };
  };

  return { notes, addNote, changeNote, deleteNote };
};
