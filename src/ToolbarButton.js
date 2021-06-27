import { useEffect, useRef } from 'react';

function ToolbarButton(props) {
  const toolbarButton = useRef();

  useEffect(() => {
    toolbarButton.current.addEventListener('mousedown', () => {
      let rippleParent = document.createElement('span');
      let rippleChild = document.createElement('span');
      rippleParent.classList.add('ripple-parent');
      rippleParent.classList.add('ripple-parent-enter');
      rippleChild.classList.add('ripple-child');
      rippleParent.appendChild(rippleChild);
      toolbarButton.current.appendChild(rippleParent);
      toolbarButton.current.addEventListener('mouseleave', Exit);
      toolbarButton.current.addEventListener('mouseup', Exit);
      function Exit() {
        rippleChild.classList.add('ripple-child-exit');
        rippleChild.addEventListener('animationend', () => {
          rippleParent.remove();
        });
      }
    });
  }, []);

  return (
    <button
      onClick={props.onClick}
      id={props.id}
      className={props.className}
      ref={toolbarButton}
    >
      <span className="ToolbarButtonSpan">{props.children}</span>
    </button>
  );
}

export default ToolbarButton;
