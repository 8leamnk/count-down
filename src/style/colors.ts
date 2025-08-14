const COLOR = Object.freeze({
  white: '#ffffff',
  gray001: '#b7bbc1',
  gray002: '#a8b1b2',
  gray003: '#98a2b3',
  gray004: '#85949d',
  gray005: '#7d797d',
  gray006: '#5B595A',
  gray007: '#413d3f',
  gray008: '#231E22',
  black: '#000000',
  blueGreen001: '#e0f0ef',
  red001: '#ff3215',
});

const colors = {
  ...COLOR,
  primary: COLOR.gray001,
  outer: COLOR.gray004,
  inner: COLOR.blueGreen001,
};

export default colors;
