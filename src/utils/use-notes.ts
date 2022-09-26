import { useEffect, useState } from "react";
import { randomIdString } from "./helpers";
import { NoteType } from "../types";

export const useNotes = () => {
  const initialNotes: NoteType[] = [
    {
      id: randomIdString(),
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: {
              level: 1,
            },
            content: [
              {
                type: "text",
                text: "Hello There 👋🏻",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Now you can start taking notes!",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "You can also delete a note by clicking the delete button.",
              },
            ],
          },
        ],
      },
      createdAt: 1662190997263,
      updatedAt: 1662191325109,
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

  const addNote = (note: any) => {
    const newNotes = [
      ...notes,
      {
        id: randomIdString(),
        content: {
          type: "doc",
          content: note,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ].sort((a, b) => b.createdAt - a.createdAt);

    _saveNotes(newNotes);
  };

  const changeNote = (id: string) => {
    return (content: any) => {
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
