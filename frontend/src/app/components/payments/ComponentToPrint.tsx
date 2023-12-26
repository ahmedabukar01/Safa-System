import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const ComponentToPrint = forwardRef(( props, ref ) => {
  return (
  <div ref={ref}>
    <p>ljl;jkl</p>
  </div>
)});

export default ComponentToPrint;