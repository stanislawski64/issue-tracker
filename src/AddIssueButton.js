import { useEffect, useRef } from 'react';
import { ReactComponent as PlusIcon } from './icons/PlusIcon.svg';

function AddIssueButton({ triggerModalRender, defaultGroup }) {
  const PlusButton = useRef();

  useEffect(() => {
    const button = PlusButton.current;
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
  }, []);

  return (
    <div className="AddIssueDiv">
      <button
        className="AddIssueButton"
        onClick={() => triggerModalRender(defaultGroup)}
        ref={PlusButton}
      >
        <div className="AddIssueIconContainer">
          <PlusIcon className="AddIssueIcon" />
        </div>
      </button>
    </div>
  );
}

export default AddIssueButton;
