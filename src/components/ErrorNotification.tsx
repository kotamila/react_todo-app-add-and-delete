import React from 'react';

interface Props {
  message: string;
  onHide: () => void;
}

export const ErrorNotification: React.FC<Props> = ({ message, onHide }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger is-light ${!message ? 'hidden' : ''}`}
  >
    <button
      data-cy="HideErrorButton"
      type="button"
      className="delete"
      onClick={onHide}
    />
    {message}
  </div>
);
