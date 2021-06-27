import Select from './Select';
import FormButton from './FormButton';
import Textarea from './Textarea';
import { useState } from 'react';

function AddIssueForm({ defaultGroup }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState({});

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
    if (title.length > 150) {
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
        onSubmit={handleSubmit}
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
