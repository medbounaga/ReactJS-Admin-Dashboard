import { useState, useMemo } from 'react';

const useSortableData = (items, defaultSortBy = null) => {
  const [sortedBy, setSortedBy] = useState(defaultSortBy);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortedBy !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortedBy.key] < b[sortedBy.key]) {
          return sortedBy.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortedBy.key] > b[sortedBy.key]) {
          return sortedBy.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    console.log(sortableItems);
    return sortableItems;
  }, [items, sortedBy]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortedBy &&
      sortedBy.key === key &&
      sortedBy.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortedBy({ key, direction });
  };

  return { sortedItems, requestSort, sortedBy };
};

export default useSortableData;
