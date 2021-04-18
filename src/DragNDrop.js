import { useState, useRef } from 'react';

function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  function handleDragStart(e, params) {
    console.log('drag starting...', params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  }

  function handleDragEnter(e, params) {
    console.log('Entering drag...', params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log('target is not the same');
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0],
        );
        dragItem.current = params;
        return newList;
      });
    }
  }

  function handleDragEnd() {
    console.log('Ending drag...');
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  }

  function getStyles(params) {
    const currentItem = dragItem.current;
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      return 'current Issue';
    }
    return 'Issue';
  }

  return (
    <div className="CardsContainer">
      {list.map((grp, grpI) => (
        <div
          key={grp.title}
          className="Card"
          onDragEnter={
            dragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
              : null
          }
        >
          <div className="CardTitleDiv">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div
              onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
              onDragEnter={
                dragging ? (e) => handleDragEnter(e, { grpI, itemI }) : null
              }
              draggable
              key={item}
              className={dragging ? getStyles({ grpI, itemI }) : 'Issue'}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DragNDrop;
