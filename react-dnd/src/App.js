import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Basket } from './Basket';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <Basket />
            </div>
        </DndProvider>
    );
}

export default App;
