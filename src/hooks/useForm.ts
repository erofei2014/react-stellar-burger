import { useState, ChangeEvent } from 'react';

type TInputValues = {
  [key: string]: string;
};

type TUseForm<T> = {
  form: T;
  setValue: (form:T) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useForm = <T extends TInputValues>(inputform: T): TUseForm<T> => {
  const [form, setValue] = useState(inputform);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  return {form, setValue, onChange};
};