import { useRef } from 'react';
import Toolbar from './Toolbar';
import SideMenu from './SideMenu';
import Backdrop from './Backdrop';
import Aux from './Auxiliary';

function ToolbarSideMenuContainer() {
  const backdrop = useRef();
  const sidemenu = useRef();

  function toggleBackdrop() {
    backdrop.current.classList.toggle('visible');
  }

  function toggleSideMenu() {
    console.log(sidemenu.current.classList);
    sidemenu.current.classList.toggle('translated');
    sidemenu.current.classList.toggle('visible');
    sidemenu.current.classList.add('transition');
    setTimeout(function () {
      sidemenu.current.classList.remove('transition');
    }, 225);
    toggleBackdrop();
  }

  return (
    <Aux>
      <Backdrop
        backdropOnClickFunction={toggleSideMenu}
        caseSpecificClass="SideMenuBackdrop"
        ref={backdrop}
      />
      <Toolbar toggleSideMenu={toggleSideMenu} />
      <SideMenu ref={sidemenu} />
    </Aux>
  );
}
export default ToolbarSideMenuContainer;
