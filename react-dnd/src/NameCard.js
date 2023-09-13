import { useDrag } from 'react-dnd';
import './Basket.css';

export const NameCard = ({ id, name, main, handleClick }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'name',
        item: { id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <div className="nameCard" ref={dragRef}>
            <div className="name">
                {name}
                {isDragging && ': dragging'}
            </div>
            {main && (
                <button onClick={() => handleClick({ id: id, name: name })}>
                    Add to the right
                </button>
            )}
        </div>
    );
};
