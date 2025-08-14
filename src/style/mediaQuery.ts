import { css, type RuleSet } from 'styled-components';
import DEVICE_SIZE from './deviceSize';

export const mobile = (inner: RuleSet<object>) => {
  return css`
    @media (max-width: ${DEVICE_SIZE.mobile}px) {
      ${inner};
    }
  `;
};
