import React from 'react';

function Backdrop({ backdropOnClickFunction, caseSpecificClass }, ref) {
  return (
    <div
      onClick={() => backdropOnClickFunction()}
      className={'Backdrop ' + caseSpecificClass}
      ref={ref}
    ></div>
  );
}
export default React.forwardRef(Backdrop);
