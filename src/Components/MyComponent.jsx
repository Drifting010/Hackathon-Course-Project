// MyComponent.jsx
import React, { useState } from 'react';

// eslint-disable-next-line react/function-component-definition
const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <div>
      <h1>Count: {count}</h1>
      <button type="button" onClick={handleClick}>Increment</button>
    </div>
  );
};

export default MyComponent;
