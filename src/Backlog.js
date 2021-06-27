import { useEffect, useState } from 'react';
import Modal from './Modal';
import DragNDropBacklog from './DragNDropBacklog';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from './auth-context';
import { client } from './api-client';

function Backlog() {
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

  const [data, setData] = useState([{ title: 'Backlog', items: [] }]);

  useEffect(() => {
    const newData = JSON.parse(JSON.stringify(data));
    issues.forEach((issue, index) => {
      newData[0].items.splice(issue.listPosition - 1, 0, {
        index: index,
        title: issue.title,
      });
    });
    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues]);

  function processIssueProps(index) {
    console.log('displayed issue index', index);
    setDescription(issues[index].description);
    setTitle(issues[index].title);
    setIndex(index);
  }

  function deleteIssue(index) {
    hideConfirmationModal();
    hideModal();
    console.log('deleted, reduced to atoms', index);
    console.log('issues[index]', issues[index]);
  }

  function hideModal() {
    setDescription(false);
    setTitle(false);
    setIndex(false);
  }

  function hideConfirmationModal() {
    setRenderConfirmationModal(false);
  }

  return (
    <main className="MainContent Backlog">
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
      <DragNDropBacklog data={data} processIssueProps={processIssueProps} />
    </main>
  );
}

export default Backlog;
