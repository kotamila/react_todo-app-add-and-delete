import React from 'react';
import { addTodo, USER_ID } from '../todos';
import { Todo } from '../types/Todo';

interface HandleSubmitArgs {
  event: React.FormEvent;
  newTitle: string;
  setNewTitle: (title: string) => void;
  setTempTodo: (todo: Todo | null) => void;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: (msg: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const handleSubmit = ({
  event,
  newTitle,
  setNewTitle,
  setTempTodo,
  setIsAdding,
  setErrorMessage,
  setTodos,
  inputRef,
}: HandleSubmitArgs) => {
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
