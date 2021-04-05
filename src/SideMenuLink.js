import React from 'react';
import { Link } from 'react-router-dom';

function SideMenuLink(props) {
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
        <span className="ripple-span"></span>
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
