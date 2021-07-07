function Ripple(
  rippleSpan,
  buttonRef,
  additionalRippleClass,
  additionalEventListener,
) {
  //rippleSpan.current, buttonRef.current
  rippleSpan.addEventListener('mousedown', (event) => {
    let rippleParent = document.createElement('span');
    let x = event.clientX - rippleSpan.getBoundingClientRect().left;
    let y = event.clientY - rippleSpan.getBoundingClientRect().top;
    const r = Math.sqrt(
      Math.pow(
        Math.abs(x - buttonRef.offsetWidth / 2) + buttonRef.offsetWidth / 2,
        2,
      ) +
        Math.pow(
          Math.abs(y - buttonRef.offsetHeight / 2) + buttonRef.offsetHeight / 2,
          2,
        ),
    );
    rippleParent.style.left = x - r + 'px';
    rippleParent.style.top = y - r + 'px';
    rippleParent.style.height = 2 * r + 'px';
    rippleParent.style.width = 2 * r + 'px';
    let rippleChild = document.createElement('span');
    rippleParent.classList.add('ripple-parent');
    rippleParent.classList.add('ripple-parent-enter');
    rippleChild.classList.add('ripple-child');
    if (additionalRippleClass) rippleChild.classList.add(additionalRippleClass);
    rippleParent.appendChild(rippleChild);
    rippleSpan.appendChild(rippleParent);
    rippleSpan.addEventListener('mouseleave', Exit);
    rippleSpan.addEventListener('mouseup', Exit);
    if (additionalEventListener)
      rippleSpan.addEventListener(additionalEventListener, Exit);
    function Exit() {
      rippleChild.classList.add('ripple-child-exit');
      rippleChild.addEventListener('animationend', () => {
        rippleParent.remove();
      });
    }
  });
}

export { Ripple };
