export type Item = {
  _id: string,
  name: string,
  [key: string]: any,
};

export type ClassName = string | { [key: string]: boolean };

export type Value = number | string | boolean;
