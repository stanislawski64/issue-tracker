function ToolbarButton(props) {
  return (
    <button onClick={props.onClick} id={props.id} className={props.className}>
      <span className="ToolbarButtonSpan">{props.children}</span>
    </button>
  );
}

export default ToolbarButton;
