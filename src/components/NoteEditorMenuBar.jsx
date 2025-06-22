import { HiBold } from "react-icons/hi2";
import { FiItalic } from "react-icons/fi";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { MdFormatListBulleted } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";

const NoteEditorMenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group mt-3 text-white bg-[#0e0e0f] rounded-t-md w-full">
      <div className=" flex justify-start py-5 px-3 font-bold gap-5 flex-wrap border-b-2 border-gray-800 ">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "bg-gray-400 font-extrabold rounded-sm p-2"
              : ""
          }
        >
          <HiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-gray-400 font-extrabold rounded-sm p-2"
              : ""
          }
        >
          <FiItalic />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-400 font-extrabold rounded-sm p-2"
              : ""
          }
        >
          <LuHeading1 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-400 font-extrabold rounded-sm p-2"
              : ""
          }
        >
          <LuHeading2 />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "bg-gray-400 font-extrabold rounded-sm p-2"
              : ""
          }
        >
          <MdFormatListBulleted />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "bg-gray-400 font-extrabold rounded-sm p-2"
              : ""
          }
        >
          <MdFormatListNumbered />
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default NoteEditorMenuBar;
