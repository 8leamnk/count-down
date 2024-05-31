import { css } from 'styled-components';
import DEVICE_SIZE from './deviceSize';

export const mobile = (inner) => {
  return css`
    @media (max-width: ${DEVICE_SIZE.mobile}px) {
      ${inner};
    }
  `;
};
