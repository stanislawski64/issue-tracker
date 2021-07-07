import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import DragNDropBoard from './DragNDropBoard';
import ConfirmationModal from './ConfirmationModal';
import Snackbar from './Snackbar';
import { useAuth } from './auth-context';
import { client } from './api-client';
import { useHistory } from 'react-router-dom';

function Board() {
  const { token } = useAuth();

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/login', { notLoggedIn: true });
    }
  }, [token, history]);

  const location = useLocation();

  const [issues, setIssues] = useState([]);

  const [title, setTitle] = useState(false);

  const [description, setDescription] = useState(false);

  const [index, setIndex] = useState(false);

  const [status, setStatus] = useState(false);

  const [renderConfirmationModal, setRenderConfirmationModal] = useState(false);

  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    if (!location.state) return;
    if (location.state.loggedIn)
      setSnackbar('You have successfully logged in.');
    window.history.replaceState(null, '');
  }, [location]);

  useEffect(() => {
    client('issues', { token }).then(({ issues }) => {
      console.log('issues', issues);
      setIssues(issues);
    });
  }, [token]);

  const initialState = [
    { title: 'to do', items: [] },
    { title: 'in progress', items: [] },
    { title: 'in review', items: [] },
    { title: 'done', items: [] },
  ];

  const [data, setData] = useState(initialState);

  useEffect(() => {
    const newData = initialState;
    newData.forEach((group) => {
      issues.forEach((issue, index) => {
        issue.status === group.title &&
          group.items.splice(issue.statusPosition, 0, {
            id: issue.id,
            index: index,
            title: issue.title,
            statusPosition: issue.statusPosition,
          });
      });
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

  function hideModal() {
    setDescription(false);
    setTitle(false);
    setIndex(false);
  }

  function hideConfirmationModal() {
    setRenderConfirmationModal(false);
  }

  function updateIssues(list, newStatus) {
    let statusPosition = 0;
    list.forEach((issue) => {
      // if (issue.statusPosition !== statusPosition) {
      client(`issues/${issue.id}`, {
        token,
        method: 'PUT',
        data: {
          status: newStatus,
          statusPosition: statusPosition++,
        },
      }).then(({ issue: changedIssue }) => {
        console.log('changed issue', changedIssue);
      });
      // } else {
      //   statusPosition++;
      // }
    });
  }

  function deleteIssue(index) {
    hideConfirmationModal();
    hideModal();
    client(`issues/${issues[index].id}`, {
      token,
      method: 'DELETE',
    }).then(({ issue: removedIssue }) => {
      console.log('removed issue', removedIssue);
      setIssues(issues.filter((item, i) => i !== index));
    });
    setSnackbar('Issue has been deleted.');
  }

  return (
    <main className="MainContent Board">
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
      <DragNDropBoard
        data={data}
        processIssueProps={processIssueProps}
        issues={issues}
        setIssues={setIssues}
        updateIssues={updateIssues}
        setSnackbar={setSnackbar}
      />
    </main>
  );
}

export default Board;
