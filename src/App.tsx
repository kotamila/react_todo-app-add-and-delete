/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, addTodo, deleteTodo, USER_ID } from './todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty!');
      setTimeout(() => setErrorMessage(''), 3000);

      return;
    }

    const newTodoData = {
      title: trimmedTitle,
      completed: false,
      userId: USER_ID,
    };

    setTempTodo({
      id: 0,
      ...newTodoData,
    });

    setIsAdding(true);

    addTodo(newTodoData)
      .then(createdTodo => {
        setTodos(prev => [...prev, createdTodo]);
        setNewTitle('');
        setTempTodo(null);
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setIsAdding(false);
        setTempTodo(null);
        inputRef.current?.focus();
      });
  };

  const handleDelete = (todoId: number) => {
    setDeletingTodoIds(prev => [...prev, todoId]);

    deleteTodo(todoId)
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
      })
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => {
        setDeletingTodoIds(prev => prev.filter(id => id !== todoId));
      });
  };

  const handleClearCompleted = () => {
    const completedIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    completedIds.forEach(todoId => {
      setDeletingTodoIds(prev => [...prev, todoId]);

      deleteTodo(todoId)
        .then(() => {
          setTodos(prev => prev.filter(todo => todo.id !== todoId));
        })
        .catch(() => {
          setErrorMessage('Unable to delete a todo');
          setTimeout(() => setErrorMessage(''), 3000);
        })
        .finally(() => {
          setDeletingTodoIds(prev => prev.filter(id => id !== todoId));
        });
    });
  };

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

  return (
    <div className="todoapp">
      {!USER_ID && <UserWarning />}

      {USER_ID && (
        <>
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <header className="todoapp__header">
              <button type="button" className="todoapp__toggle-all active" />

              <form onSubmit={handleSubmit}>
                <input
                  data-cy="NewTodoField"
                  ref={inputRef}
                  type="text"
                  className="todoapp__new-todo"
                  placeholder="What needs to be done?"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  disabled={isAdding}
                />
              </form>
            </header>

            <section
              className={`todoapp__main ${!hasTodos ? 'hidden' : ''}`}
              data-cy="TodoList"
            >
              {visibleTodos.map(todo => (
                <div
                  data-cy="Todo"
                  key={todo.id}
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                >
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
                    onClick={() => handleDelete(todo.id)}
                  >
                    ×
                  </button>
                  <div
                    data-cy="TodoLoader"
                    className={classNames('modal overlay', {
                      'is-active': deletingTodoIds.includes(todo.id),
                    })}
                  >
                    {/* eslint-disable-next-line max-len*/}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}

              {tempTodo && (
                <div key={tempTodo.id} className="todo" data-cy="Todo">
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
                </div>
              )}
            </section>

            {hasTodos && (
              <footer className="todoapp__footer">
                <span className="todo-count">
                  {todos.filter(todo => !todo.completed).length} items left
                </span>

                <nav className="filter">
                  <a
                    href="#/"
                    className={filter === 'all' ? 'selected' : ''}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </a>
                  <a
                    href="#/active"
                    className={filter === 'active' ? 'selected' : ''}
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </a>
                  <a
                    href="#/completed"
                    className={filter === 'completed' ? 'selected' : ''}
                    onClick={() => setFilter('completed')}
                  >
                    Completed
                  </a>
                </nav>

                <button
                  type="button"
                  className="todoapp__clear-completed"
                  onClick={handleClearCompleted}
                  disabled={!hasCompleted}
                >
                  Clear completed
                </button>
              </footer>
            )}

            {/* Notification */}
            <div
              data-cy="ErrorNotification"
              className={`notification is-danger is-light ${
                !errorMessage ? 'hidden' : ''
              }`}
            >
              <button
                data-cy="HideErrorButton"
                type="button"
                className="delete"
                onClick={() => setErrorMessage('')}
              />
              {errorMessage}
            </div>
          </div>
        </>
      )}

      {(isAdding || deletingTodoIds.length > 0) && (
        <div
          data-cy="TodoLoader"
          className={classNames('modal overlay', {
            'is-active': isAdding || deletingTodoIds.length > 0,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )}
    </div>
  );
};
