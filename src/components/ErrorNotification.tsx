import React from 'react';

interface Props {
  message: string;
  onHide: () => void;
}

export const ErrorNotification: React.FC<Props> = ({ message, onHide }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light`}
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
};
