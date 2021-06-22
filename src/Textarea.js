import { useEffect, useRef } from 'react';

function Textarea({ text, maxLength, value, setValue }) {
  const textarea = useRef();
  const label = useRef();
  const div = useRef();
  const legend = useRef();

  useEffect(() => {
    textarea.current.addEventListener('focus', () => {
      label.current.classList.add('shrunkLabel');
      label.current.classList.add('focused');
      div.current.classList.add('focused');
      legend.current.classList.add('focusedLegend');
    });
  }, []);

  function Exit() {
    if (!textarea.current.value) {
      label.current.classList.remove('shrunkLabel');
      legend.current.classList.remove('focusedLegend');
    }
    label.current.classList.remove('focused');
    div.current.classList.remove('focused');
  }

  useEffect(() => {
    textarea.current.addEventListener('blur', Exit);
  }, []);

  useEffect(() => {
    let node = textarea.current;
    return () => node.removeEventListener('blur', Exit);
  }, []);

  function autoGrow(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight - 37 + 'px';
  }

  return (
    <div className="TextareaOuterDiv">
      <label ref={label} className="FormLabel" htmlFor="textarea">
        {text}
      </label>
      <div ref={div} className="TextareaInnerDiv">
        <textarea
          ref={textarea}
          rows="1"
          onInput={(e) => {
            autoGrow(e);
          }}
          id="textarea"
          className="Textarea"
          maxLength={maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <fieldset className="Fieldset">
          <legend ref={legend} className="Legend">
            <span>{text}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
}

export default Textarea;
