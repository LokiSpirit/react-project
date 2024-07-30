import React, { useEffect, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';

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
      <CustomButton style={{ marginRight: '20px' }} type="button" onClick={() => setError(true)}>
        {children}
      </CustomButton>
    </div>
  );
};

export default ThrowButton;
