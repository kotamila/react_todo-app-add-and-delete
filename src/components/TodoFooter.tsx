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
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} {activeCount === 1 ? 'item' : 'items'} left
    </span>

    <ul className="filter" data-cy="Filter">
      <li>
        <a
          href="#/"
          className={filter === 'all' ? 'selected' : ''}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={filter === 'active' ? 'selected' : ''}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={filter === 'completed' ? 'selected' : ''}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={onClearCompleted}
      disabled={!hasCompleted}
    >
      Clear completed
    </button>
  </footer>
);
