import { act, renderHook } from '@testing-library/react';
import usePopup from '../usePopup';

describe('팝업 기능 테스트', () => {
  test('팝업 정보가 없으면 팝업이 열리지 않는다.', () => {
    // given
    const POPUP_INFO = { title: '', description: '' };
    const POPUP_STATE = false;

    // when
    const { result } = renderHook(() => usePopup());
    act(() => {
      result.current.handlePopup();
    });

    // then
    expect(result.current.popupOpened).toBe(POPUP_STATE);
    expect(result.current.popupInfo).toEqual(POPUP_INFO);
  });

  test('팝업 정보가 있으면 팝업이 열린다.', () => {
    // given
    const POPUP_INFO = { title: '팝업 제목', description: '팝업 내용' };
    const POPUP_STATE = true;

    // when
    const { result } = renderHook(() => usePopup());
    act(() => {
      result.current.handlePopup(POPUP_INFO);
    });

    // then
    expect(result.current.popupOpened).toBe(POPUP_STATE);
    expect(result.current.popupInfo).toEqual(POPUP_INFO);
  });
});
