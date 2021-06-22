import { useEffect, useState, useRef } from 'react';
import Aux from './Auxiliary';
import SelectMenu from './SelectMenu';
import { ReactComponent as SelectIcon } from './SelectIcon.svg';

function Select({ defaultGroup, selectOptions, value, setValue }) {
  const [isExpanded, setExpanded] = useState();

  const [top, setTop] = useState(0);

  const [left, setLeft] = useState(0);

  const select = useRef();
  const label = useRef();
  const div = useRef();
  const legend = useRef();
  const outerselect = useRef();
  const input = useRef();

  if (defaultGroup === 'Backlog') defaultGroup = null;

  useEffect(() => {
    if (defaultGroup) {
      setValue(defaultGroup);
      label.current.classList.add('shrunkLabel');
      legend.current.classList.add('focusedLegend');
    }
  }, [defaultGroup, setValue]);

  useEffect(() => {
    select.current.addEventListener('click', () => {
      label.current.classList.add('shrunkLabel');
      label.current.classList.add('focused');
      div.current.classList.add('focused');
      legend.current.classList.add('focusedLegend');
      let pos = outerselect.current.getBoundingClientRect();
      setExpanded(true);
      setTop(pos.top);
      setLeft(pos.left);
    });
  }, []);

  useEffect(() => {
    if (isExpanded === false) {
      if (!input.current.value) {
        label.current.classList.remove('shrunkLabel');
        legend.current.classList.remove('focusedLegend');
      }
      label.current.classList.remove('focused');
      div.current.classList.remove('focused');
    }
  }, [isExpanded]);

  function onResize() {
    let pos = outerselect.current.getBoundingClientRect();
    console.log(pos);
    setTop(pos.top);
    setLeft(pos.left);
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function hideSelectMenu() {
    setExpanded(false);
  }

  function handleSelecting(value) {
    setExpanded(false);
    setValue(value);
  }

  return (
    <Aux>
      <div className="OuterSelectDiv" ref={outerselect}>
        <label className="FormLabel" ref={label}>
          Status
        </label>
        <div className="SelectDiv" ref={div}>
          <div className="InnerSelectDiv" ref={select} tabIndex="0">
            {value}
          </div>
          <input
            aria-hidden="true"
            className="SelectInput"
            ref={input}
            defaultValue={value}
          />
          <SelectIcon className="SelectIcon" />
          <fieldset aria-hidden="true" className="Fieldset">
            <legend className="Legend" ref={legend}>
              <span>Status</span>
            </legend>
          </fieldset>
        </div>
      </div>
      {isExpanded ? (
        <SelectMenu
          selectOptions={selectOptions}
          value={value}
          hideSelectMenu={hideSelectMenu}
          handleSelecting={handleSelecting}
          top={top}
          left={left}
        />
      ) : null}
    </Aux>
  );
}

export default Select;
