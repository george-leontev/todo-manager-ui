import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.orange.dark.css';
import './App.css';

import { TodoList } from './components/todo-list';
import { MainMenu } from './components/main-menu/main-menu';
import { AddIcon, MenuIcon } from './app-icons';
import { useMemo, useState } from 'react';
import { MenuItem } from './models/menu-item';
import { Popup } from 'devextreme-react';

function App() {

  const [isVisible, setIsVisisble] = useState<boolean>(false)

  const items = useMemo(() => {
    return [
      {
        text: 'Добавить задачу',
        icon: () => <AddIcon size={24} />,
        onClick: (e) => {
          setIsVisisble(true);
        }
      },
    ] as MenuItem[]
  }, []);

  return (
    <div className="app">
      <div className='app-container'>
        <MainMenu menuIcon={() => <MenuIcon size={24} />} items={items} />
        <TodoList />
        {isVisible
          ? <Popup
              width={600}
              height={400}
              visible
              showCloseButton
              onHidden={() => {
                setIsVisisble(false);
              }}
              title='Add task'
            >
            hi!
          </Popup>
          : null
        }
      </div>
    </div>
  );
}

export default App;
