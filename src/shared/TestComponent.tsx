'use client';

import { useState } from 'react';

export default function TestComponent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count is {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
    </>
  );
}
