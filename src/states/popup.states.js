import { atom, selector } from 'recoil';

const EMPTY_STRING = '';
const POPUP_INFO = Object.freeze({
  title: EMPTY_STRING,
  description: EMPTY_STRING,
});

export const popupInfoState = atom({
  key: 'popupInfoState',
  default: POPUP_INFO,
});

export const popupOpenedState = selector({
  key: 'popupOpenedState',
  get: ({ get }) => {
    const { title, description } = get(popupInfoState);

    return title !== EMPTY_STRING && description !== EMPTY_STRING;
  },
});
