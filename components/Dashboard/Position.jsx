"use client"
import { deletePositionAPI, getPositionsAPI, addPositionAPI } from "@/lib/api";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"


export default function Position() {
  const { data: session } = useSession();

  const [positionData, setPositionData] = useState({});
  const [posNameInput, setPosNameInput] = useState("");

  useEffect(() => {
    fetchPositions()
  }, [])


  async function fetchPositions() {
    const response = await getPositionsAPI();
    console.log("RES pos:: ", response)
    setPositionData(response);
  }

  async function handleAddPosition(e) {
    e.preventDefault()
    if (!posNameInput) {
      toast.info("Input is empty");
      return;
    }
    let data = { positionName: posNameInput, name: session?.user?.name }
    const response = await addPositionAPI(data);
    if (response.status === 200) {
      toast.success(response.data);
      e.target.reset();
      setPosNameInput("");
      fetchPositions()
    }
    else if(response.status === 300){
      toast.warning(response.data);
    }
    else {
      toast.error(response.data)
    }
  }

  async function handleDeletePosition(pos) {
    const response = await deletePositionAPI(pos.positionId);
    if (response.status === 200) {
      toast.success(`${pos.positionName} position deleted successfully.`);
      fetchPositions();
    }
    else if(response.status === 300){
      toast.warning("Nothing to delete");
    }
    else {
      toast.error("There was an error.")
    }
  }

  let pos_list;
  if (positionData.status === 200) {
    pos_list = positionData.data.map(((pos) => (
      <li key={pos.positionId} className="py-1 border-b-2 border-slate-200 flex justify-between items-center">
        <p className="text-lg">{pos.positionName}</p>
        <FontAwesomeIcon onClick={() => { handleDeletePosition(pos) }} className="px-2 hover:text-purple-500 cursor-pointer transition-all duration-300 ease" icon={faTrash}></FontAwesomeIcon>
      </li>
    )))
  }
  else if (positionData.status === 0) {
    pos_list = <div className="p-3 mx-1 bg-slate-200 text-slate-800 flex justify-center items-center">
      <h5>No data Recorded</h5>
    </div>
  }
  else if (positionData.status === 500 || positionData.status === 400) {
    pos_list = <div className="p-3 mx-1 bg-pink-200 flex justify-center items-center">
      <p>Couldn&apos;t Fetch Data, Error Status: {positionData.status}</p>
    </div>
  }
  else {
    pos_list = <div className="p-4 mx-1 text-slate-800">
      <div className="loader"></div>
    </div>
  }

  return (
    <form onSubmit={(e) => { handleAddPosition(e) }}>
      <h3 className="my-2">Add Positions</h3>
      <div>
        <div className="flex gap-2">
          <input className="w-full py-1.5 px-2 border-2 border-slate-300 caret-purple-500 focus:outline-none focus:border-purple-500 rounded-md" onChange={(e) => { setPosNameInput(e.target.value) }} value={posNameInput} />
          <button type="submit" className="py-1.5 px-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease shadow-md shadow-slate-400 rounded-md text-md">Add Position</button>
        </div>
        <div className="pt-5 text-slate-800">
          <h4>Added Positions {positionData.status === 200 ? positionData.data.length : ""}</h4>
          <div className="py-3">
            {pos_list}
          </div>
        </div>
      </div>
    </form>
  )
}
