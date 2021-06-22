import Aux from './Auxiliary';
import { useEffect, useRef } from 'react';

function Input({ InputArray }) {
  const divRef = useRef([]);
  const legendRef = useRef([]);

  useEffect(() => {
    divRef.current.forEach((div, i) => {
      let label = div.previousSibling;
      let input = div.firstChild;
      let legend = legendRef.current[i];
      input.addEventListener('focus', () => {
        label.classList.add('shrunkLabel');
        label.classList.add('focused');
        div.classList.add('focused');
        legend.classList.add('focusedLegend');
        input.addEventListener('blur', Exit);
        function Exit() {
          if (!input.value) {
            label.classList.remove('shrunkLabel');
            legend.classList.remove('focusedLegend');
          }
          label.classList.remove('focused');
          div.classList.remove('focused');
          input.removeEventListener('blur', Exit);
        }
      });
      input.addEventListener('animationstart', (e) => {
        label.classList.add('shrunkLabel');
        legend.classList.add('focusedLegend');
      });
    });
  }, []);

  const Input = InputArray.map((item, i) => {
    return (
      <div className="OuterInputDiv" key={item.id}>
        <label className="FormLabel" htmlFor={item.id}>
          {item.name}
        </label>
        <div className="InnerInputDiv" ref={(ref) => (divRef.current[i] = ref)}>
          <input
            id={item.id}
            type={item.type}
            className="Input"
            {...item.ref}
          />
          <fieldset aria-hidden="true" className="Fieldset">
            <legend
              className="Legend"
              ref={(ref) => (legendRef.current[i] = ref)}
            >
              <span>{item.name}</span>
            </legend>
          </fieldset>
        </div>
      </div>
    );
  });
  return <Aux>{Input}</Aux>;
}
export default Input;
