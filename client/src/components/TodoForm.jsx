import { useState } from 'react'
import PropTypes from 'prop-types';

const TodoForm = props => {

    const { handleAddTask } = props // destructuring o desestructuracion  

    const [tarea, setTarea] = useState("")

    const handleSubmit = (element) => {
        element.preventDefault();
        const newTask = {
            done: false,
            id: (+new Date).toString(),
            tarea: tarea // tarea: "algo > valor de mi variable de estado tarea"
        }
        const usuarioAutenticar = {
            user: "usuario"
        }
        console.log(newTask)

        handleAddTask(newTask)

        // Mandar los datos a nuestra api
        const handlePostReq = async () => {
            const res = await fetch('http://localhost:3001/autenticar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioAutenticar)
            })
            const data = await res.json()
            console.log(data)
        }

        handlePostReq();


        setTarea("")
    };

    return (
        <div>
        <form className='w-full max-w-sm' onSubmit={handleSubmit}>
            <div className="flex items-center border-b border-teal-500 py-2">
                <input
                    type='text' 
                    className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                    onChange={(element) => setTarea(element.target.value) }
                />
                <button
                    type='submit'
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    disabled={(tarea)?"":"disabled"}
                >Agregar</button>
            </div>
        </form>
        </div>
    )
}

TodoForm.propTypes = {
    handleAddTask: PropTypes.func.isRequired
}

export default TodoForm;
