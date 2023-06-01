import * as React from 'react';
import { cloneElement, type FC, type JSXElementConstructor, memo } from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { Typography } from 'components/Shared/Antd';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  render: React.ReactElement<any, string | JSXElementConstructor<any>>;
  [otherProp: string]: any;
}

const Field: FC<IProps> = ({ name, render, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          cloneElement(render, { ...field, status: !!errors[name] ? 'error' : undefined, ...otherProps })
        }
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => <span className=''>{message}</span>}
      />
    </>
  );
};

export default memo(Field);
