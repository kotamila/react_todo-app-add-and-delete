import React from 'react';

interface Props {
  message: string | null;
  onHide: () => void;
}

export const ErrorNotification: React.FC<Props> = ({ message, onHide }) => {
  const isVisible = Boolean(message);

  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light ${isVisible ? '' : 'hidden'}`}
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
