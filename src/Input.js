import Aux from './Auxiliary';
import { useEffect } from 'react';

function Input({ InputArray }) {
  useEffect(() => {
    const form = document.getElementById('Form');
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input, index) => {
      let label = form.getElementsByClassName('FormLabel')[index];
      let div = form.getElementsByClassName('InnerInputDiv')[index];
      let legend = form.getElementsByClassName('Legend')[index];
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

  const Input = InputArray.map((item) => (
    <div className="OuterInputDiv" key={item.id}>
      <label className="FormLabel" htmlFor={item.id}>
        {item.name}
      </label>
      <div className="InnerInputDiv">
        <input id={item.id} type={item.type} className="Input" {...item.ref} />
        <fieldset aria-hidden="true" className="Fieldset">
          <legend className="Legend">
            <span>{item.name}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  ));
  return <Aux>{Input}</Aux>;
}
export default Input;
