import { useRef, useEffect, KeyboardEvent } from "react";
import EditorJS, { EditorConfig, OutputBlockData } from "@editorjs/editorjs";
import Header from "@editorjs/header";

interface Props extends EditorConfig {
  addNote?: (e: KeyboardEvent<HTMLDivElement>, editor: EditorJS) => void;
  className?: string;
  value: OutputBlockData[];
  holder: string;
}

const Editor = ({ onChange, holder, value, addNote, className }: Props) => {
  const holderRef = useRef(holder);
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const editorInstance = new EditorJS({
      holder: holderRef.current,
      tools: {
        header: Header,
      },
      data: {
        time: Date.now(),
        blocks: value,
      },
      onChange: onChange,
      placeholder: "Write your story...",
      minHeight: 0,
    });

    editorRef.current = editorInstance;

    return () => {
      editorRef?.current?.destroy && editorRef.current.destroy();
    };
  }, []);

  return (
    <>
      <div
        id={holder}
        className={className}
        onKeyDown={(e) => {
          if (addNote && editorRef.current) addNote(e, editorRef.current);
        }}
      />
    </>
  );
};

export default Editor;
