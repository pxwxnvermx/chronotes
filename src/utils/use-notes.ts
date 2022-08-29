import { OutputBlockData } from "@editorjs/editorjs";
import { useEffect, useState } from "react";
import { randomIdString } from "./helpers";
import { NoteType } from "../types";

export const useNotes = () => {
  const initialNotes: NoteType[] = [
    {
      id: "9eekg9u2yu5gv7l5aon03b",
      content: [
        {
          id: "eoeuzgkTib",
          type: "header",
          data: {
            text: "Hello There&nbsp;👋🏻",
            level: 1,
          },
        },
        {
          id: "NWYKepaiCS",
          type: "paragraph",
          data: {
            text: "This is a paragraph. You can change it and add more text.",
          },
        },
        {
          id: "t4mWbiTYzI",
          type: "paragraph",
          data: {
            text: "You can add more text here.",
          },
        },
      ],
      createdAt: 1661752434761,
      updatedAt: 1661752434761,
    },
  ];

  const [notes, setNotes] = useState<NoteType[]>(initialNotes);

  useEffect((): void => {
    const localNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    if (localNotes.length > 0) setNotes(localNotes);
  }, []);

  const _saveNotes = (notes: NoteType[]) => {
    setNotes(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

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

    _saveNotes(newNotes);
  };

  const changeNote = (id: string) => {
    return (content: OutputBlockData[]) => {
      const newNotes = notes.map((note) => {
        if (note.id === id) {
          note.content = content;
          note.updatedAt = Date.now();
        }

        return note;
      });

      _saveNotes(newNotes);
    };
  };

  const deleteNote = (id: string) => {
    return () => {
      const newNotes = notes.filter((note) => note.id !== id);

      setNotes(newNotes);
      localStorage.setItem("notes", JSON.stringify(newNotes));
    };
  };

  return { notes, addNote, changeNote, deleteNote };
};
