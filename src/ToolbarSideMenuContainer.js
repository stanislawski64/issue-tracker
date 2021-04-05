import Toolbar from './Toolbar';
import SideMenu from './SideMenu';
import Backdrop from './Backdrop';
import Aux from './Auxiliary';

function ToolbarSideMenuContainer() {
  function toggleBackdrop() {
    const Backdrop = document.getElementsByClassName('Backdrop')[0];
    Backdrop.classList.toggle('visible');
  }

  function toggleSideMenu() {
    const SideMenu = document.getElementsByClassName('SideMenu')[0];
    SideMenu.classList.toggle('translated');
    SideMenu.classList.toggle('visible');
    SideMenu.classList.add('transition');
    setTimeout(function () {
      SideMenu.classList.remove('transition');
    }, 225);
    toggleBackdrop();
  }

  return (
    <Aux>
      <Backdrop toggleSideMenu={toggleSideMenu} />
      <Toolbar toggleSideMenu={toggleSideMenu} />
      <SideMenu />
    </Aux>
  );
}
export default ToolbarSideMenuContainer;
