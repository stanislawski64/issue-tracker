import Modal from './Modal';
import BacklogData from './BacklogData';
import ConfirmationModal from './ConfirmationModal';
import Snackbar from './Snackbar';
import { useEffect, useState } from 'react';
import { useAuth } from './auth-context';
import { client } from './api-client';
import { useHistory } from 'react-router-dom';

function Backlog() {
  const { token } = useAuth();

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/login', { notLoggedIn: true });
    }
  }, [token, history]);

  const [issues, setIssues] = useState([]);

  const [title, setTitle] = useState(false);

  const [description, setDescription] = useState(false);

  const [index, setIndex] = useState(false);

  const [status, setStatus] = useState(false);

  const [renderConfirmationModal, setRenderConfirmationModal] = useState(false);

  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    client('issues', { token }).then(({ issues }) => {
      // console.log('issues', issues);
      setIssues(issues);
    });
  }, [token]);

  const initialState = [{ title: 'Backlog', items: [] }];

  const [data, setData] = useState(initialState);

  useEffect(() => {
    const newData = initialState;
    const statuses = [
      { title: 'to do', items: [] },
      { title: 'in progress', items: [] },
      { title: 'in review', items: [] },
      { title: 'done', items: [] },
    ];
    statuses.forEach((status) => {
      issues.forEach((issue, index) => {
        issue.status === status.title &&
          status.items.splice(issue.statusPosition, 0, {
            id: issue.id,
            index: index,
            title: issue.title,
            status: issue.status,
          });
      });
    });
    statuses.forEach((group) => {
      newData[0].items.push(...group.items);
    });
    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues]);

  function processIssueProps(index) {
    setDescription(issues[index].description);
    setTitle(issues[index].title);
    setIndex(index);
    setStatus(issues[index].status);
  }

  function deleteIssue(index) {
    hideConfirmationModal();
    hideModal();
    client(`issues/${issues[index].id}`, {
      token,
      method: 'DELETE',
    }).then(({ issue: removedIssue }) => {
      setIssues(issues.filter((item, i) => i !== index));
    });
    setSnackbar('Issue has been deleted.');
  }

  function hideModal() {
    setDescription(false);
    setTitle(false);
    setIndex(false);
    setStatus(false);
  }

  function hideConfirmationModal() {
    setRenderConfirmationModal(false);
  }

  return (
    <main className="MainContent Backlog">
      {snackbar && (
        <Snackbar
          type="success"
          setOpen={setSnackbar}
          message={snackbar}
          showFor={6000}
        />
      )}
      {description && title ? (
        <Modal
          description={description}
          title={title}
          status={status}
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
      <BacklogData
        data={data}
        processIssueProps={processIssueProps}
        issues={issues}
        setIssues={setIssues}
        setSnackbar={setSnackbar}
      />
    </main>
  );
}

export default Backlog;
