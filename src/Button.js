import { useEffect, useRef } from 'react';
import { Ripple } from './Ripple';

function Button({ text, secondary, onClick }) {
  const rippleSpan = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    Ripple(rippleSpan.current, buttonRef.current);
  }, []);

  return (
    <button
      className={`Button ${secondary ? 'ButtonSecondary' : 'ButtonPrimary'} `}
      onClick={() => onClick()}
      ref={buttonRef}
    >
      <span className="ripple-span" ref={rippleSpan}></span>
      <span>{text}</span>
    </button>
  );
}

export default Button;
