import { useState } from 'react';

function Counter() {
  // Step 1: Initialize state
  const [count, setCount] = useState(0);

  // Step 2: Return JSX
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>React Counter</h2>
      <p style={{ fontSize: '20px' }}>Current Count: {count}</p>

      <button
        onClick={() => setCount(count + 1)}
        style={{ margin: '5px', padding: '10px 15px' }}
      >
        Increment
      </button>

      <button
        onClick={() => setCount(count - 1)}
        style={{ margin: '5px', padding: '10px 15px' }}
      >
        Decrement
      </button>

      <button
        onClick={() => setCount(0)}
        style={{ margin: '5px', padding: '10px 15px' }}
      >
        Reset
      </button>
    </div>
  );
}

export default Counter;