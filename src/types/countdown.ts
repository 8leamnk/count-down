export type InputKey = 'minute' | 'second';

export type CountdownInputs = {
  [key in InputKey]: string;
};

export type CountdownData = {
  [key in InputKey]: number;
};
