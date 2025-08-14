import { css } from 'styled-components';
import { PUBLIC_PATH } from '../constants/global';

const fontFace = css`
  @font-face {
    font-family: 'DS-Digital';
    font-weight: 700;
    src: url('${PUBLIC_PATH}/assets/fonts/DS-Digital/DS-DIGIB.TTF')
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 300;
    src: url('${PUBLIC_PATH}/assets/fonts/Montserrat/Montserrat-Light.ttf')
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 400;
    src: url('${PUBLIC_PATH}/assets/fonts/Montserrat/Montserrat-Regular.ttf')
      format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 700;
    src: url('${PUBLIC_PATH}/assets/fonts/Montserrat/Montserrat-Bold.ttf')
      format('truetype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    src: url('${PUBLIC_PATH}/assets/fonts/Pretendard/Pretendard-Light.otf')
      format('opentype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    src: url('${PUBLIC_PATH}/assets/fonts/Pretendard/Pretendard-Regular.otf')
      format('opentype');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    src: url('${PUBLIC_PATH}/assets/fonts/Pretendard/Pretendard-Black.otf')
      format('opentype');
  }
`;

export default fontFace;
