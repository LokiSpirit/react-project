import React, { useEffect, useState } from 'react';

type ButtonProps = {
  children?: React.ReactNode;
};

const ThrowButton: React.FC<ButtonProps> = ({ children }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      throw new Error('Simulated error. Throw Error button was clicked');
    }
  }, [error]);

  return (
    <div>
      <button className="button" type="button" onClick={() => setError(true)}>
        {children}
      </button>
    </div>
  );
};

export default ThrowButton;
