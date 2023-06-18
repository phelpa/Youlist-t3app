import React from 'react';

import Field from '../Field';

type InputProps = {
  legend: string;
  name: string;
  className?: string;
  [x: string]: unknown
};

const Input = ({ legend, name, className = '', ...rest }: InputProps) => {
  return (
    <>
      <span>{legend}</span>
      <Field name={name}
        render={
          <input type="text" className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${className}`}
            {...rest}
          />
        }
      />
    </>
  );
};
export default Input;
