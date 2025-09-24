import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  deletingTodoIds: number[];
  onDelete: (id: number) => void;
  hasTodos: boolean;
}

export const TodoList: React.FC<Props> = ({
  todos,
  deletingTodoIds,
  onDelete,
  hasTodos,
}) => (
  <section
    className={`todoapp__main ${!hasTodos ? 'hidden' : ''}`}
    data-cy="TodoList"
  >
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        isDeleting={deletingTodoIds.includes(todo.id)}
        onDelete={onDelete}
      />
    ))}
  </section>
);
