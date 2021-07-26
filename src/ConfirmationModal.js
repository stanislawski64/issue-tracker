import Button from './Button';
import { useEffect, useRef } from 'react';
import { ReactComponent as CloseIcon } from './icons/CloseIcon.svg';

function ConfirmationModal({
  text,
  hideConfirmationModal,
  onClickYes,
  onClickNo,
}) {
  const modalButton = useRef([]);

  useEffect(() => {
    modalButton.current.addEventListener('mousedown', () => {
      let rippleParent = document.createElement('span');
      let rippleChild = document.createElement('span');
      rippleParent.classList.add('ripple-parent');
      rippleParent.classList.add('ripple-parent-enter');
      rippleChild.classList.add('ripple-child');
      rippleParent.appendChild(rippleChild);
      modalButton.current.appendChild(rippleParent);
      modalButton.current.addEventListener('mouseleave', Exit);
      modalButton.current.addEventListener('mouseup', Exit);
      function Exit() {
        rippleChild.classList.add('ripple-child-exit');
        rippleChild.addEventListener('animationend', () => {
          rippleParent.remove();
        });
      }
    });
  }, []);

  function handleModalPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div className="ModalContainer" onClick={() => hideConfirmationModal()}>
      <div
        className="ConfirmationModal"
        onClick={(e) => handleModalPropagation(e)}
      >
        <button
          className="ModalButton"
          ref={modalButton}
          onClick={() => hideConfirmationModal()}
        >
          <div className="ModalIconContainer">
            <CloseIcon className="ModalIcon" />
          </div>
        </button>
        <div className="ConfirmationModalContent">
          <span>{text}</span>
          <div className="ConfirmationModalButtonsDiv">
            <Button text="yes" onClick={onClickYes} />
            <Button text="no" secondary={true} onClick={onClickNo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
