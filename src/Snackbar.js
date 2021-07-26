import { useEffect, useRef } from 'react';
import { ReactComponent as SuccessIcon } from './icons/SuccessIcon.svg';
import { ReactComponent as CloseIcon } from './icons/CloseIcon.svg';
import { ReactComponent as ErrorIcon } from './icons/ErrorIcon.svg';

function Snackbar({ type, setOpen, message, showFor, caseSpecificClass }) {
  const autoHide = useRef();

  useEffect(() => {
    autoHide.current = setTimeout(() => {
      hideSnackbar(innerSnackbarDiv);
    }, showFor);
  });

  useEffect(() => () => {
    clearTimeout(autoHide.current);
  });

  const snackbarButton = useRef();
  const innerSnackbarDiv = useRef();

  useEffect(() => {
    snackbarButton.current.addEventListener('mousedown', () => {
      let rippleParent = document.createElement('span');
      let rippleChild = document.createElement('span');
      rippleParent.classList.add('ripple-parent-small');
      rippleParent.classList.add('ripple-parent-enter');
      rippleChild.classList.add('ripple-child');
      rippleParent.appendChild(rippleChild);
      snackbarButton.current.appendChild(rippleParent);
      snackbarButton.current.addEventListener('mouseleave', Exit);
      snackbarButton.current.addEventListener('mouseup', Exit);
      function Exit() {
        rippleChild.classList.add('ripple-child-exit');
        rippleChild.addEventListener('animationend', () => {
          rippleParent.remove();
        });
      }
    });
  }, []);

  useEffect(() => {
    innerSnackbarDiv.current.classList.add('InnerSnackbarDivTransition');
  }, []);

  function hideSnackbar(innerSnackbarDiv) {
    clearTimeout(autoHide.current);
    innerSnackbarDiv.current.classList.remove('InnerSnackbarDivTransition');
    innerSnackbarDiv.current.addEventListener('transitionend', () => {
      setOpen(false);
    });
  }

  return (
    <div className={`OuterSnackbarDiv ${caseSpecificClass}`}>
      <div
        className={`InnerSnackbarDiv ${
          type === 'success' ? 'SnackbarSuccess' : 'SnackbarError'
        }`}
        ref={innerSnackbarDiv}
      >
        <div className="SnackbarIconContainer">
          {type === 'success' ? (
            <SuccessIcon className="SnackbarIcon" />
          ) : (
            <ErrorIcon className="SnackbarIcon" />
          )}
        </div>
        <div className="SnackbarMessage">{message}</div>
        <div className="SnackbarCloseIconDiv">
          <button
            className="SnackbarButton"
            ref={snackbarButton}
            onClick={() => hideSnackbar(innerSnackbarDiv)}
          >
            <span className="SnackbarCloseIconContainer">
              <CloseIcon className="SnackbarCloseIcon" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Snackbar;
