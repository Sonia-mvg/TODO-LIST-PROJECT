import './App.css';
// import TodoContainer from './components/TodoContainer';
import { Route, Link, Routes } from 'react-router-dom';
import {Done} from './pages/Done';
import {Home} from './pages/Home';

function App() {

  return (

    <div>
      <nav>
        <ul className="flex justify-start">
          <li className="flex-1 mr-2">
            <Link 
              className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" 
              to="/home">Inicio</Link>
          </li>
          <li className="flex-1 mr-2">
            <Link 
              className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" 
              to="/done">Done</Link>
          </li>
          <li className="flex-1 mr-2">
            <Link 
              className="block py-2 px-4 text-gray-400 cursor-not-allowed" 
              to="/">Disabled</Link>
          </li>
        </ul>
      </nav>

      <Routes>
       <Route path="/Home" Component={Home} />
       <Route path="/Done" Component={Done} />
       <Route path="/" Component={Home} />
     </Routes>
     
    </div>



    // <div className="App">
    //   <header className="App-header">
    //     <TodoContainer />
    //   </header>
    // </div>
  );
  
}

export default App;

