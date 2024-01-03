import { useCallback, useState } from 'react';

const POPUP_INFO = Object.freeze({ title: '', description: '' });

function usePopup() {
  const [popupOpened, setPopupOpened] = useState(false);
  const [popupInfo, setPopupInfo] = useState(POPUP_INFO);

  const handlePopup = useCallback(
    (nextPopupInfo = POPUP_INFO) => {
      const { title, description } = nextPopupInfo;

      setPopupOpened(title !== '' && description !== '');
      setPopupInfo({ ...popupInfo, ...nextPopupInfo });
    },
    [popupInfo],
  );

  return { popupOpened, popupInfo, handlePopup };
}

export default usePopup;
