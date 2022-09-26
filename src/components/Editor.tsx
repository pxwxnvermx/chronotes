import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { debounce } from "lodash";

interface Props {
  className?: string;
  value?: any;
  changeNote: (content: any) => void;
}

const Editor = ({ value, changeNote, className }: Props) => {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: value,
      onUpdate: debounce(({ editor }) => {
        changeNote(editor.getJSON());
      }, 300),
      editorProps: {
        attributes: {
          class: "outline-none",
        },
      },
    },
    [],
  );

  return <EditorContent className={className} editor={editor} />;
};

export default Editor;
