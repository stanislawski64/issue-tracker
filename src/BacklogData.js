import { useState, useEffect } from 'react';
import AddIssueButton from './AddIssueButton';
import Modal from './Modal';

function BacklogData({
  data,
  processIssueProps,
  issues,
  setIssues,
  setSnackbar,
}) {
  const [list, setList] = useState([]);

  const [renderModal, setRenderModal] = useState(false);

  useEffect(() => {
    setList(data);
  }, [data]);

  function triggerModalRender(group) {
    setRenderModal(group);
  }

  function hideModal() {
    setRenderModal(false);
  }

  return (
    <>
      {list.map((group) => (
        <div key={group.title} className="BacklogTable">
          {group.items.map((item) => (
            <div
              onClick={() => processIssueProps(item.index)}
              key={item.id}
              className="BacklogRow"
            >
              {item.title}
              <div
                className={`Status ${
                  item.status === 'to do'
                    ? 'Todo'
                    : item.status === 'in progress'
                    ? 'InProgress'
                    : item.status === 'in review'
                    ? 'InReview'
                    : 'Done'
                }`}
              >
                {item.status}
              </div>
            </div>
          ))}
          <AddIssueButton
            defaultGroup={group.title}
            triggerModalRender={triggerModalRender}
          />
        </div>
      ))}
      {renderModal ? (
        <Modal
          hideModal={hideModal}
          defaultGroup={renderModal}
          issues={issues}
          setIssues={setIssues}
          setSnackbar={setSnackbar}
        />
      ) : null}
    </>
  );
}

export default BacklogData;
