import { useEffect, useRef } from 'react';

function FormButton({ text }) {
  const rippleSpan = useRef();

  useEffect(() => {
    rippleSpan.current.addEventListener('mousedown', (event) => {
      let rippleParent = document.createElement('span');
      let x = event.clientX - rippleSpan.current.getBoundingClientRect().left;
      let y = event.clientY - rippleSpan.current.getBoundingClientRect().top;
      const r = Math.sqrt(
        Math.pow(Math.abs(x - 125) + 125, 2) +
          Math.pow(Math.abs(y - 18) + 18, 2),
      );
      rippleParent.style.left = x - r + 'px';
      rippleParent.style.top = y - r + 'px';
      rippleParent.style.height = 2 * r + 'px';
      rippleParent.style.width = 2 * r + 'px';
      let rippleChild = document.createElement('span');
      rippleParent.classList.add('ripple-parent');
      rippleParent.classList.add('ripple-parent-enter');
      rippleChild.classList.add('ripple-child');
      rippleParent.appendChild(rippleChild);
      rippleSpan.current.appendChild(rippleParent);
      rippleSpan.current.addEventListener('mouseleave', Exit);
      rippleSpan.current.addEventListener('mouseup', Exit);
      function Exit() {
        rippleChild.classList.add('ripple-child-exit');
        rippleChild.addEventListener('animationend', () => {
          rippleParent.remove();
        });
      }
    });
  }, []);

  return (
    <button className="FormButton">
      <span className="ripple-span" ref={rippleSpan}></span>
      <span>{text}</span>
    </button>
  );
}

export default FormButton;
