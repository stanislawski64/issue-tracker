import Select from './Select';
import FormButton from './FormButton';
import Textarea from './Textarea';
import { useState } from 'react';
import { client } from './api-client';
import { useAuth } from './auth-context';

function AddIssueForm({
  defaultGroup,
  issues,
  setIssues,
  hideModal,
  setSnackbar,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState({});

  const { token } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    let localError = {};
    if (status === null || title.length === 0 || description.length === 0) {
      if (status === null) localError.status = 'Status field is required';
      if (title.length === 0) localError.title = 'Title field is required';
      if (description.length === 0)
        localError.description = 'Description field is required';
      setError(localError);
      return;
    }
    if (title.length > 200) {
      localError.title = 'Title field exceeds the character limit';
      setError(localError);
      return;
    }
    if (description.length > 2000) {
      localError.description = 'Description field exceeds the character limit';
      setError(localError);
      return;
    }
    setError(localError);

    console.log({ status, title, description });

    const defaultValues = {
      type: 'task',
      priority: '4',
      reporterId: 4,
      projectId: 1,
    }; // these values are never used or shown

    let statusPosition = 0;

    client('issues', {
      token,
      data: {
        status,
        title,
        description,
        ...defaultValues,
        statusPosition: statusPosition++,
      },
    }).then(({ issue: newIssue }) => {
      console.log('new issue', newIssue);
      setIssues([...issues, newIssue]);
    });

    issues.forEach((issue) => {
      if (issue.status === status)
        if (issue.statusPosition !== statusPosition) {
          client(`issues/${issue.id}`, {
            token,
            method: 'PUT',
            data: {
              statusPosition: statusPosition++,
            },
          }).then(({ issue: changedIssue }) => {
            console.log('changed issue', changedIssue);
          });
        } else {
          statusPosition++;
        }
    });

    setSnackbar('Issue has been added.');

    hideModal();
  }

  const selectOptions = [
    { name: 'to do', displayName: 'To Do' },
    { name: 'in progress', displayName: 'In Progress' },
    { name: 'in review', displayName: 'In Review' },
    { name: 'done', displayName: 'Done' },
  ];

  return (
    <form id="Form" className="ModalForm" onSubmit={(e) => handleSubmit(e)}>
      <Select
        defaultGroup={defaultGroup}
        selectOptions={selectOptions}
        value={status}
        setValue={setStatus}
      />
      <Textarea
        text="Title"
        maxLength="150"
        value={title}
        setValue={setTitle}
      />
      <Textarea
        text="Description"
        maxLength="2000"
        value={description}
        setValue={setDescription}
      />
      <FormButton text="Add Issue" />
      <div className="FormError">
        {error.status && <p>{error.status}</p>}
        {error.title && <p>{error.title}</p>}
        {error.description && <p>{error.description}</p>}
      </div>
    </form>
  );
}
export default AddIssueForm;
