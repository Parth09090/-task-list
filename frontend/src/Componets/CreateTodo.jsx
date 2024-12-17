import { useMemo, useState } from "react"

export function CreateTodo(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    //will have to do a post request here
    
    async function addTodo(){
        try{
            const request = await fetch("http://localhost:3000/todo" , {
                method : "POST",
                body : JSON.stringify({
                    title : title,
                    description : description,
                    status : false
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!request.ok) {
                throw new Error(`HTTP error! status: ${request.status}`);
            }
            const json = await request.json();
            // alert("Todo added");
        }
        catch(err){
            console.error("Error adding todo:", error);
        }
    }
    
    return <div className="flex justify-center mb-4">
        <input type="text" placeholder="Enter Title" onChange={function(e){
            setTitle(e.target.value);
        }} className="shadow-lg p-2 w-1/4 border-solid border-gray-800 border-2 mx-0.5 rounded"/>
        <input type="text" placeholder="Enter Description" onChange={function(e){
            setDescription(e.target.value);
        }}  className="shadow-lg p-2 w-1/4 border-solid border-gray-800 border-2 mx-0.5 rounded"/>
        <button onClick={addTodo} 
        className="bg-gray-800 text-white h-10 w-20 rounded-3xl mx-0.5 text-center">Add Task</button>
    </div>
}