import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { dateAndTimeConversion } from "../utils/helpers/dateAndTimeConversion";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Notes = ({ note, handleDelete }) => {
  const navigate = useNavigate();
  const [onHover, setOnHover] = useState(false);
  const [content, setContent] = useState(note?.content);

  const handleOnMouseEvent = () => {
    setOnHover(!onHover);
  };

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ];

  const editor = useEditor({
    extensions,
    content,
    editable: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert outline-none focus:outline-none  p- rounded-b-md max-h-[300px] min-h-[300px] overflow-y-scroll",
      },
    },
  });

  const handleEdit = async (id) => {
    await axiosInstance
      .patch(`/note/edit/access/${id}`, {}, { withCredentials: true })
      .then(() => {
        navigate(`/note/${id}`);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };



  return (
    <div
      className="border relative border-gray-700 rounded-lg "
      onMouseEnter={() => handleOnMouseEvent()}
      onMouseLeave={() => handleOnMouseEvent()}
    >
      {onHover && (
        <div className=" absolute bg-[#0e0e0f] rounded-t-md p-2 left-0 top-0 right-0  z-50 h-12  flex justify-center">
          <h1 className=" text-center ">
            <span className=" font-bold mr-1">Last Edited:</span>{" "}
            {dateAndTimeConversion(note?.updatedAt)}
          </h1>
        </div>
      )}
      <div className=" border-b border-gray-600 p-3 h-12">
        <h1 className=" font-bold text-center">{note?.title}</h1>
      </div>
      <div className=" my-1 px-2 min-h-60">
        <EditorContent editor={editor} />
      </div>
      <div className=" flex justify-end gap- border-t border-gray-700 py-1 pr-2 h-12 ">
        <button
          className="  hover:cursor-pointer  text-white p-2 hover:bg-gray-700  rounded-lg"
          onClick={() => {
            handleEdit(note?._id);
          }}
        >
          <MdEdit size={22} />
        </button>
        <button className="  hover:cursor-pointer  text-white p-2 hover:bg-gray-700 rounded-lg" onClick={()=> handleDelete(note?._id)}>
          <MdDelete size={22} />
        </button>
      </div>
    </div>
  );
};

export default Notes;
