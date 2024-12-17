import { useEffect, useState } from "react"

export function DeleteTodo({todoid}){

    async function deleteTodo(){
        try{
            const response = await fetch(`http://localhost:3000/delete/${todoid}` , {
                method : "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const json = await response.json();
            console.log("Deleted Todo:", json);
        }
        catch(err){
            console.error("Error Deleting todo:", err);
        }
        
    }
    return <div>
      <button className=" rounded-full w-6 h-6 text-center items-center font-semibold" onClick={deleteTodo}><svg class="h-6 w-6 text-red-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg></button>
    </div>
}