import { DeleteTodo } from "./DeleteTodo";
import { UpdateTodo } from "./UpdateTodo";

export function Todo({todos}){

    return <div className="bg-gray-700 m-4 p-2 border-solid border-gray-900 border-2 rounded-md shadow-2xl drop-shadow-lg">
        <div className="flex bg-gray-300 p-1 rounded-t-md rounded-b-md  items-center">
            <DeleteTodo todoid={todos._id}/>
            <div className="pl-2 from-neutral-600 font-sans font-medium">{todos.title}</div>
        </div>
        
        <div className="text-gray-300 pb-4">{todos.description}</div>
        <UpdateTodo todoid={todos._id}/>
        
    </div>
}