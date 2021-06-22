function SelectMenu({
  selectOptions,
  value,
  hideSelectMenu,
  handleSelecting,
  top,
  left,
}) {
  function handlePropagation(e) {
    e.stopPropagation();
  }

  return (
    <div
      className="SelectMenuContainer"
      style={{ marginTop: 0 }}
      onClick={() => hideSelectMenu()}
    >
      <div
        className="SelectMenu"
        style={{ top: top, left: left }}
        onClick={(e) => handlePropagation(e)}
      >
        <ul className="SelectMenuList">
          {selectOptions.map((option) => (
            <li
              key={option.name}
              className={`SelectMenuListItem ${
                option.name === value ? 'SelectMenuListItemSelected' : null
              }`}
              onClick={() => handleSelecting(option.name)}
            >
              {option.displayName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectMenu;
