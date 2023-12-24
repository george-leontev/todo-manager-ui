
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.dark.css';
import './App.css';
import { TodoList } from './components/todo-list';

function App() {

  return (
    <div className="App">
      <div className='container'>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
