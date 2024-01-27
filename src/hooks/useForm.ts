import { useState, ChangeEvent } from 'react';

type TInputValues = {
  [key: string]: string;
};

type TUseForm = {
  form: TInputValues;
  setValue: (form:{}) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useForm = (inputform: TInputValues = {}): TUseForm => {
  const [form, setValue] = useState(inputform);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  return {form, setValue, onChange};
};