import { useEffect, useState } from "react"

export function UpdateTodo({todoid}){
    const [id,setID] = useState(todoid);
    const [status,setStatus] = useState(false);

    async function update(){
        try{
            const updatedStatus = !status; // Toggle status locally
            setStatus(updatedStatus); // Update React state
            const response = await fetch(`http://localhost:3000/updateTodo/${id}` , {
                method : "PUT",
                body : JSON.stringify({
                    status : updatedStatus
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const json = await response.json();
            //alert("Todo updated successfully!");
            console.log("Updated Todo:", json);
        }
        catch(err){
            console.error("Error updating todo:", err);
        }
        
    }
    return <div>
      <button onClick={update}>
      <div className="flex">
          <div>
            <svg
              className={`h-6 w-6 ${status ? "text-green-600" : "text-red-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div
            className={`ml-2 ${status ? "text-green-600" : "text-red-400"}`}
          >
            {status ? "Completed" : "To be Completed"}
          </div>
        </div>
      </button>
    </div>
}