import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  isDeleting: boolean;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, isDeleting, onDelete }) => (
  <div
    data-cy="Todo"
    key={todo.id}
    className={`todo ${todo.completed ? 'completed' : ''}`}
  >
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        checked={todo.completed}
        readOnly
      />
    </label>
    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>
    <button
      data-cy="TodoDelete"
      type="button"
      className="todo__remove"
      onClick={() => onDelete(todo.id)}
    >
      ×
    </button>
    <div
      data-cy="TodoLoader"
      className={classNames('modal overlay', {
        'is-active': isDeleting,
      })}
    >
      {/* eslint-disable-next-line max-len*/}
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
