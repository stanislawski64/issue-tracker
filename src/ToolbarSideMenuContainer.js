import Toolbar from './Toolbar';
import SideMenu from './SideMenu';
import Aux from './Auxiliary';
import { useState, useEffect } from 'react';

function ToolbarSideMenuContainer() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1280);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1280);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <Aux>
      <Toolbar renderSideMenuButton={!isDesktop} />
      {isDesktop ? <SideMenu /> : null}
    </Aux>
  );
}
export default ToolbarSideMenuContainer;
