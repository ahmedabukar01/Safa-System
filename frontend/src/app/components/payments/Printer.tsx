import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

export const Printer = () => {

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print this out!</button>
      <div ref={componentRef}>
        <h2>this is the title</h2>
        <p>
            Hi this the body to be printed and its good thing...
        </p>
      </div>
    </div>
  );
};