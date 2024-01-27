import { type ReactNode } from 'react';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientWithId = TIngredient & {
  uuid: string;
};


export type TIngredientWithIndex = TIngredient & {
  index: number;
};

export type TOrder = {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  name: string,
  createdAt: string,
  updatedAt: string
}

export type TUser = {
  email: string,
  name: string
};

export type ChildrenProps = {
  children?: ReactNode;
};
