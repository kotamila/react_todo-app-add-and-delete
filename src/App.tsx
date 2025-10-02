/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';

import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './todos';
import { Todo } from './types/Todo';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TempTodo } from './components/TempTodo';
import { TodoFooter } from './components/TodoFooter';

import { handleSubmit } from './utils/handleSubmit';
import { handleDelete } from './utils/handleDelete';
import { handleClearCompleted } from './utils/handleClearCompleted';
import { handleToggle } from './utils/handleToggle';
import { TodoLoader } from './components/loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [deletingTodoIds, setDeletingTodoIds] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    setErrorMessage('');
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  const hasTodos = todos.length > 0;
  const completedTodos = todos.filter(todo => todo.completed);
  const hasCompleted = completedTodos.length > 0;

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      {!USER_ID && <UserWarning />}

      {USER_ID && (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <Header
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              isAdding={isAdding}
              onSubmit={event =>
                handleSubmit({
                  event,
                  newTitle,
                  setNewTitle,
                  setTempTodo,
                  setIsAdding,
                  setErrorMessage,
                  setTodos,
                  inputRef,
                })
              }
            />

            <section
              className={`todoapp__main ${!hasTodos ? 'hidden' : ''}`}
              data-cy="TodoList"
            >
              <TodoList
                todos={visibleTodos}
                deletingTodoIds={deletingTodoIds}
                onDelete={id =>
                  handleDelete(
                    id,
                    setTodos,
                    setErrorMessage,
                    setDeletingTodoIds,
                  )
                }
                hasTodos={hasTodos}
                onToggle={(id: number) =>
                  handleToggle(id, todos, setTodos, setErrorMessage)
                }
              />

              {tempTodo && <TempTodo tempTodo={tempTodo} />}
            </section>

            {hasTodos && (
              <TodoFooter
                activeCount={activeCount}
                filter={filter}
                setFilter={setFilter}
                hasCompleted={hasCompleted}
                onClearCompleted={() =>
                  handleClearCompleted(
                    todos,
                    setTodos,
                    setErrorMessage,
                    setDeletingTodoIds,
                  )
                }
              />
            )}

            <div
              data-cy="ErrorNotification"
              className={`notification is-danger is-light ${
                !errorMessage ? 'hidden' : ''
              }`}
            >
              <button
                data-cy="HiddeErrorButton"
                type="button"
                className="delete"
                onClick={() => setErrorMessage('')}
              />
              {errorMessage}
            </div>
          </div>
          {deletingTodoIds.length > 0 && <TodoLoader />}
        </>
      )}
    </div>
  );
};
