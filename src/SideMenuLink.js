import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Ripple } from './Ripple';

function SideMenuLink(props) {
  const rippleSpan = useRef();
  const linkRef = useRef();

  useEffect(() => {
    Ripple(
      rippleSpan.current,
      linkRef.current,
      'ripple-child-side-menu-link',
      'dragleave',
    );
  }, []);

  return (
    <div className="SideMenuDiv" ref={linkRef}>
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
