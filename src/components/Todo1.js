import React, { useState } from "react";
import "./Todo1.css";
import noteImgsvg from "../Images/notesvg.svg";
import editImg from "../Images/w-editsvg.svg";
import deleteImg from "../Images/w-delete_svg.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doneIcon from "../Images/doneIcon.png";

// TODO  white strip remove from bottom
// add scroll bar  
//to task added or add task
// ..refresh

function Todo1() {
  const [inputData, setInputData] = useState("");
  const [itemList, setItemList] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of item being edited

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      if (editIndex !== null) {
        updateTask(); // If in edit mode, update the task
      } else {
        addTask(); // If not in edit mode, add a new task
      }
    }
  };

  const addTask = () => {
    if (!inputData) {
      toast.error("Please Add Task!", { position: "top-left" });
    } else {
      setItemList([...itemList, inputData]);
      setInputData("");
    }
  };

  const updateTask = () => {
    if (!inputData) {
      toast.error("Please Enter Value to Update!", { position: "top-left" });
    } else {
      const updatedList = [...itemList];
      updatedList[editIndex] = inputData;
      setItemList(updatedList);
      setInputData("");
      setEditIndex(null); // Reset edit mode after updating task
    }
  };

  const editItems = (index, curItem) => {
    setInputData(curItem);
    setEditIndex(index); // Set the index of the item being edited
  };

  const deleteItems = (index) => {
    const updatedList = [...itemList];
    updatedList.splice(index, 1);
    setItemList(updatedList);
  };

  return (
    <>
      <div className="todoList  p-10">
        <div className="todoContainer container mx-auto rounded-xl shadow-lg shadow-gray-500 p-8 ">
          <div className="header">
            <div className="header_image">
              <img src={noteImgsvg} className="mx-auto" />
            </div>
            <div className="header_text mx-auto w-fit m-5 font-bold text-gray-700">
              ADD my TASK
            </div>
          </div>

          <div className="inputField flex justify-center items-center">
            <input
              onChange={(e) => setInputData(e.target.value)}
              onKeyPress={(e) => handleKeypress(e)}
              value={inputData}
              type="text"
              id="task"
              className="border border-gray-300 bg-gray-50 text-sm rounded-lg block 
              w-3/6 p-3 dark:placeholder-gray-400  text-black"
              placeholder="Add Task"
              required
            />
            <button
              type="button"

              className={`text-white ${
                editIndex !== null ? "bg-white-500" : "bg-blue-800"
              } ${
                editIndex !== null ? "" : "hover:bg-gray-700"
              } focus:outline-none 
              font-medium rounded-lg text-md ${
                editIndex !== null ? "px-0 py-0" : "px-5 py-3"
              } ml-5 `}

              onClick={editIndex !== null ? updateTask : addTask} // Update or add task based on edit mode
            >
              {editIndex !== null ? (
                <img
                  src={doneIcon}
                  alt="Done"
                  style={{ width: "35px", height: "35px" }}
                  className="ml-0"
                />
              ) : (
                "Add"
              )}
            </button>
            <ToastContainer />
          </div>

          <div className="border-t-4 border-gray-300 my-5"></div>

          <div className="itemsList_section">
            {itemList.map((curItem, index) => {
              return (
                <div
                  className="itemsList flex justify-between w-full bg-blue-900
                  rounded-lg py-2 pl-6 my-3 text-white"
                  key={index}
                >
                  <div className="w-4/5 my-1"> {curItem}</div>
                  <div className="itemsEdits flex justify-evenly w-1/5">
                    <img
                      src={editImg}
                      className="editItem"
                      onClick={() => editItems(index, curItem)}
                    />
                    <img
                      src={deleteImg}
                      className="deleteItem"
                      onClick={() => deleteItems(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo1;
