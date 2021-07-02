import { ReactComponent as CloseIcon } from './CloseIcon.svg';
import { ReactComponent as DeleteIcon } from './DeleteIcon.svg';
import ModalContent from './ModalContent';
import AddIssueForm from './AddIssueForm';
import { useEffect, useRef } from 'react';

function Modal({
  title,
  description,
  status,
  hideModal,
  defaultGroup,
  setRenderConfirmationModal,
  issues,
  setIssues,
}) {
  const modalButton = useRef([]);

  useEffect(() => {
    modalButton.current.forEach((button) => {
      button.addEventListener('mousedown', () => {
        let rippleParent = document.createElement('span');
        let rippleChild = document.createElement('span');
        rippleParent.classList.add('ripple-parent');
        rippleParent.classList.add('ripple-parent-enter');
        rippleChild.classList.add('ripple-child');
        rippleParent.appendChild(rippleChild);
        button.appendChild(rippleParent);
        button.addEventListener('mouseleave', Exit);
        button.addEventListener('mouseup', Exit);
        function Exit() {
          rippleChild.classList.add('ripple-child-exit');
          rippleChild.addEventListener('animationend', () => {
            rippleParent.remove();
          });
        }
      });
    });
  }, []);

  function handleModalPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div className="ModalContainer" onClick={() => hideModal()}>
      <div
        id="Modal"
        className="Modal"
        onClick={(e) => handleModalPropagation(e)}
      >
        <button
          className="ModalButton"
          ref={(ref) => (modalButton.current[0] = ref)}
          onClick={() => hideModal()}
        >
          <div className="ModalIconContainer">
            <CloseIcon className="ModalIcon" />
          </div>
        </button>
        {defaultGroup ? null : (
          <button
            id="TrashIcon"
            className="ModalButton"
            ref={(ref) => (modalButton.current[1] = ref)}
            onClick={() => setRenderConfirmationModal(true)}
          >
            <div className="ModalIconContainer">
              <DeleteIcon className="ModalIcon" />
            </div>
          </button>
        )}

        {description && title ? (
          <ModalContent>
            <h1 className="ModalTitle">{title}</h1>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </ModalContent>
        ) : null}
        {defaultGroup ? (
          <ModalContent>
            <AddIssueForm
              defaultGroup={defaultGroup}
              issues={issues}
              setIssues={setIssues}
              hideModal={hideModal}
            />
          </ModalContent>
        ) : null}
      </div>
    </div>
  );
}

export default Modal;
