import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function SideMenuLink(props) {
  const rippleSpan = useRef();

  useEffect(() => {
    rippleSpan.current.addEventListener('mousedown', (event) => {
      let rippleParent = document.createElement('span');
      let x = event.clientX - rippleSpan.current.getBoundingClientRect().left;
      let y = event.clientY - rippleSpan.current.getBoundingClientRect().top;
      const r = Math.sqrt(
        Math.pow(Math.abs(x - 120) + 120, 2) +
          Math.pow(Math.abs(y - 24) + 24, 2),
      );
      rippleParent.style.height = 2 * r + 'px';
      rippleParent.style.width = 2 * r + 'px';
      rippleParent.style.left = x - r + 'px';
      rippleParent.style.top = y - r + 'px';
      let rippleChild = document.createElement('span');
      rippleParent.classList.add('ripple-parent');
      rippleParent.classList.add('ripple-parent-enter');
      rippleChild.classList.add('ripple-child');
      rippleChild.classList.add('ripple-child-side-menu-link');
      rippleParent.appendChild(rippleChild);
      rippleSpan.current.appendChild(rippleParent);
      rippleSpan.current.addEventListener('mouseleave', Exit);
      rippleSpan.current.addEventListener('mouseup', Exit);
      rippleSpan.current.addEventListener('dragleave', Exit);
      function Exit() {
        rippleChild.classList.add('ripple-child-exit');
        rippleChild.addEventListener('animationend', () => {
          rippleParent.remove();
        });
      }
    });
  }, []);

  return (
    <div className="SideMenuDiv">
      <Link
        to={props.linkPathname}
        className={
          'SideMenuLink ' +
          (props.currentPathname === props.linkPathname
            ? 'SideMenuLinkActive'
            : '')
        }
      >
        <span className="ripple-span" ref={rippleSpan}></span>
        <div className="SideMenuIconContainer">{props.children}</div>
        <span
          className={
            'SideMenuSpan ' +
            (props.currentPathname === props.linkPathname
              ? 'SideMenuSpanActive'
              : '')
          }
        >
          {props.name}
        </span>
      </Link>
    </div>
  );
}

export default SideMenuLink;
