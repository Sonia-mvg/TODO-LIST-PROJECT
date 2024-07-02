import TodoItem from './TodoItem'


const TodoList = props => {

  const { lista, setLista, borrarTarea, checkTarea } = props

  const onChangeStatus = e => {

    const { name, checked } = e.target;
    console.log("onChange", checked);
    let itemActual = lista.filter((i) => i.id === name)[0]
    checkTarea({
      ...itemActual, 
      done: checked
    })
    // const updateList = lista.map(item => ({
    //     ...item,
    //     done: item.id === name ? checked : item.done
    // }));
    // console.log(lista);
    // checkTarea(updateList);
};

  const checkboxes = lista.map((item) => {

    return (
      <div key={item.id} className="grid grid-cols-3 gap-4 mb-4 mt-8 border-b border-teal-500 py-2">
        <div className='col-span-2 flex justify-center items-center'>
            <TodoItem data={item} onChange={onChangeStatus}/>
        </div>
        <div className='col-span-1 flex justify-center items-center'>
            <button  
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
                onClick={() => borrarTarea(item.id)}>
                Borrar
            </button>
        </div>
      </div>
    )
  })

  
  return (

    <div className="flex justify-center">
      <ul className="w-full">
        {checkboxes.length ? checkboxes : "La lista está vacía"}
      </ul>
    </div>

  )
}

export default TodoList
