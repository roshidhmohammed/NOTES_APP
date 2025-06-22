import "../styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useEffect, useState } from "react";
import { useNoteSocket } from "../hooks/useNoteSocket";
import { useParams } from "react-router-dom";
import useFetchNoteDetails from "../hooks/useFetchNoteDetails";
import { useDispatch, useSelector } from "react-redux";
import { setShowCcolloboratorLists } from "../utils/slices/configSlice";
import ShareColloboratorLists from "./ShareColloboratorLists";
import NoteEditorMenuBar from "./NoteEditorMenuBar";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const NoteEditor = () => {
  const { id } = useParams();
  useFetchNoteDetails(id);
  const dispatch = useDispatch();
  const noteTitle = useSelector((state) => state.note.noteTitle);
  const noteContent = useSelector((state) => state.note.noteContent);
  const showCcolloboratorLists = useSelector(
    (state) => state.config.showCcolloboratorLists
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setContent(html);
      sendUpdate(html, title);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert bg-[#0e0e0f] p-4 rounded-b-md max-h-[400px] min-h-[400px] overflow-y-scroll",
      },
    },
  });

  useEffect(() => {
    editor.commands.setContent(noteContent);
    setTitle(noteTitle);
  }, [noteTitle, noteContent]);

  const { sendUpdate } = useNoteSocket(id, (incomingContent, incomingTitle) => {
    if (editor) {
      if (incomingContent !== editor.getHTML()) {
        editor.commands.setContent(incomingContent, false);
      }
    }
    setTitle(incomingTitle);
  });

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    sendUpdate(content, newTitle);
  };

  const handleShare = () => {
    dispatch(setShowCcolloboratorLists());
  };

  return (
    <div className="text-white text-wrap">
      {showCcolloboratorLists && <ShareColloboratorLists />}
      <div className=" flex justify-end mt-2">
        <button
          className=" bg-blue-900  rounded-lg p-2 px-5 hover:cursor-pointer"
          onClick={() => handleShare()}
        >
          Share
        </button>
      </div>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Place the title here"
        className="w-full bg-[#141415] h-16 mt-4 rounded-md px-2 text-2xl font-bold"
      />
      {editor && <NoteEditorMenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
