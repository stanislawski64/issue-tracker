import ToolbarButton from './ToolbarButton';
import { ReactComponent as MenuIcon } from './MenuIcon.svg';
import { ReactComponent as AccountIcon } from './AccountIcon.svg';
import { ReactComponent as NightModeIcon } from './NightModeIcon.svg';

function ToolbarButtons({ toggleSideMenu, toggleNightMode, setOpen }) {
  const ToolbarButtonsArray = [
    {
      onClick: () => toggleSideMenu(),
      id: 'MenuButton',
      className: 'ToolbarButton',
      icon: MenuIcon,
    },
    {
      onClick: () => toggleNightMode(),
      id: 'NightModeButton',
      className: 'ToolbarButton',
      icon: NightModeIcon,
    },
    {
      onClick: () => setOpen(true),
      id: 'AccountButton',
      className: 'ToolbarButton',
      icon: AccountIcon,
    },
  ];

  const ToolbarButtons = ToolbarButtonsArray.map((item) => (
    <ToolbarButton
      key={item.id}
      onClick={item.onClick}
      id={item.id}
      className={item.className}
    >
      <item.icon fill="white" />
    </ToolbarButton>
  ));

  return <>{ToolbarButtons}</>;
}

export default ToolbarButtons;
