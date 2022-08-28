import { OutputBlockData } from "@editorjs/editorjs";

export type NoteType = {
  id: string;
  content: OutputBlockData[];
  createdAt: number;
  updatedAt: number;
};
