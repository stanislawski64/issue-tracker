import { useState, useEffect } from 'react';
import Modal from './Modal';
import DragNDropBoard from './DragNDropBoard';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from './auth-context';
import { client } from './api-client';

function Board() {
  const { token } = useAuth();

  const [issues, setIssues] = useState([]);

  const [title, setTitle] = useState(false);

  const [description, setDescription] = useState(false);

  const [index, setIndex] = useState(false);

  const [renderConfirmationModal, setRenderConfirmationModal] = useState(false);

  useEffect(() => {
    client('issues', { token }).then(({ issues }) => {
      console.log('issues', issues);
      setIssues(issues);
    });
  }, [token]);

  const [data, setData] = useState([
    { title: 'to do', items: [] },
    { title: 'in progress', items: [] },
    { title: 'in review', items: [] },
    { title: 'done', items: [] },
  ]);

  useEffect(() => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.forEach((group) => {
      issues.forEach((issue, index) => {
        issue.status === group.title &&
          group.items.splice(issue.listPosition - 1, 0, {
            index: index,
            title: issue.title,
          });
      });
    });
    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues]);

  function processIssueProps(index) {
    console.log('index', index);
    setDescription(issues[index].description);
    setTitle(issues[index].title);
    setIndex(index);
  }

  function deleteIssue(index) {
    hideConfirmationModal();
    hideModal();
    console.log('deleted, reduced to atoms, gone', index);
  }

  function hideModal() {
    setDescription(false);
    setTitle(false);
    setIndex(false);
  }

  function hideConfirmationModal() {
    setRenderConfirmationModal(false);
  }

  // const data = [
  //   { title: 'to do', items: ['1', '2', '3', '4', '5', '6'] },
  //   { title: 'in progress', items: ['7', '8'] },
  //   { title: 'in review', items: ['9'] },
  //   { title: 'done', items: ['10'] },
  // ];

  return (
    <main className="MainContent Board">
      {description && title ? (
        <Modal
          description={description}
          title={title}
          hideModal={hideModal}
          setRenderConfirmationModal={setRenderConfirmationModal}
        />
      ) : null}
      {renderConfirmationModal ? (
        <ConfirmationModal
          text="Are you sure you want to delete this issue?"
          hideConfirmationModal={hideConfirmationModal}
          onClickNo={hideConfirmationModal}
          onClickYes={() => deleteIssue(index)}
        />
      ) : null}
      <DragNDropBoard data={data} processIssueProps={processIssueProps} />
    </main>
  );
}

export default Board;
