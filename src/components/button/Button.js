import React from 'react';
import classNames from 'classnames';

import './ButtonStyle.scss';

const Button = ({ children, onClick, primary, outline, type, red }) => (
  <button
    className={classNames('btn', {
      'btn-primary': primary,
      'btn-outline': outline,
      'btn-red': red,
    })}
    onClick={onClick}
    type={type}>
    {children}
  </button>
);

export default Button;
