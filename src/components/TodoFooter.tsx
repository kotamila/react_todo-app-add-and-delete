import React from 'react';

interface Props {
  activeCount: number;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export const TodoFooter: React.FC<Props> = ({
  activeCount,
  filter,
  setFilter,
  hasCompleted,
  onClearCompleted,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">{activeCount} items left</span>

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
      onClick={onClearCompleted}
      disabled={!hasCompleted}
    >
      Clear completed
    </button>
  </footer>
);
