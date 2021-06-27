import { useState, useRef, useEffect } from 'react';
import Aux from './Auxiliary';
import AddIssueButton from './AddIssueButton';
import Modal from './Modal';

function DragNDropBacklog({ data, processIssueProps }) {
  const [list, setList] = useState([]);

  const [renderModal, setRenderModal] = useState(false);

  useEffect(() => {
    setList(data);
  }, [data]);

  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();
  const newList = useRef();

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
        newList.current = JSON.parse(JSON.stringify(oldList));
        newList.current[params.grpI].items.splice(
          params.itemI,
          0,
          newList.current[currentItem.grpI].items.splice(
            currentItem.itemI,
            1,
          )[0],
        );
        dragItem.current = params;
        return newList.current;
      });
    }
  }

  function handleDragEnd() {
    console.log('Ending drag...');
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    console.log('newList', newList.current[0].items);
  }

  function getStyles(params) {
    const currentItem = dragItem.current;
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      return 'current BacklogRow';
    }
    return 'BacklogRow';
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function triggerModalRender(group) {
    setRenderModal(group);
  }

  function hideModal() {
    setRenderModal(false);
  }

  return (
    <Aux>
      {list.map((grp, grpI) => (
        <div
          key={grp.title}
          className="BacklogTable"
          onDragEnter={
            dragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
              : null
          }
          onDragOver={handleDragOver}
        >
          {grp.items.map((item, itemI) => (
            <div
              onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
              onDragEnter={
                dragging ? (e) => handleDragEnter(e, { grpI, itemI }) : null
              }
              onClick={() => processIssueProps(item.index)}
              draggable
              key={item.title}
              className={dragging ? getStyles({ grpI, itemI }) : 'BacklogRow'}
            >
              {item.title}
            </div>
          ))}
          <AddIssueButton
            defaultGroup={grp.title}
            triggerModalRender={triggerModalRender}
          />
        </div>
      ))}
      {renderModal ? (
        <Modal hideModal={hideModal} defaultGroup={renderModal} />
      ) : null}
    </Aux>
  );
}

export default DragNDropBacklog;
