import React from 'react';
import { FilterType } from '../types/Filter';

interface Props {
  activeCount: number;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
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
          onClick={() => setFilter(FilterType.All)}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={filter === 'active' ? 'selected' : ''}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterType.Active)}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={filter === 'completed' ? 'selected' : ''}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterType.Completed)}
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
