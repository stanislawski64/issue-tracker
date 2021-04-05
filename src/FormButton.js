import { useEffect } from 'react';

function FormButton({ text }) {
  useEffect(() => {
    const buttons = document
      .getElementById('Form')
      .querySelectorAll('.ripple-span');
    buttons.forEach((button) => {
      button.addEventListener('mousedown', (event) => {
        let rippleParent = document.createElement('span');
        let x = event.clientX - button.getBoundingClientRect().left;
        let y = event.clientY - button.getBoundingClientRect().top;
        const r = Math.sqrt(
          Math.pow(Math.abs(x - 112) + 112, 2) +
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

  return (
    <button className="FormButton">
      <span className="ripple-span"></span>
      <span>{text}</span>
    </button>
  );
}

export default FormButton;
