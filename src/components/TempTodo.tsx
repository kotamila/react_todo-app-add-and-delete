import React from 'react';
import { Todo } from '../types/Todo';
import { TodoLoader } from './loader';

interface Props {
  tempTodo: Todo;
}

export const TempTodo: React.FC<Props> = ({ tempTodo }) => {
  return (
    <div key={tempTodo.id} className="todo" data-cy="Todo">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={false}
          readOnly
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {tempTodo.title}{' '}
      </span>
      <button type="button" className="todo__remove" disabled>
        ×
      </button>
      <TodoLoader />
    </div>
  );
};
