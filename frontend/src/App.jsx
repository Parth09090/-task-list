import { useEffect,useState } from 'react';
import { Todo } from './Componets/Todo';
import { CreateTodo } from './Componets/CreateTodo';
function App() {
  const [todos,setTodos] = useState([]);

  useEffect(()=>{
    // const url = "http://localhost:3000/todos";
    async function getTodos() {
      const response = await fetch("http://localhost:3000/todos");
      const json = await response.json();
      return setTodos(json.todos);
    }
    getTodos();
  },[todos])
  
  return (
    <>
     <div className='bg-gray-300 h-screen w-screen items-center justify-center'>
        <div className='text-6xl font-sans font-medium text-center pb-10 pt-20'>Task-List</div>
        <CreateTodo />
        {/*Rendering todos on the App*/}
        <div className='grid grid-cols-4'>
          {todos.map((todo)=>{
            return(
            <Todo todos={todo}/>
          )
          })}
        </div>
        
     </div>
    </>
  )
}

export default App
