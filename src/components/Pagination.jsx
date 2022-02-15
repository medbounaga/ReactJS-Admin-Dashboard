import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../styles/Pagination.module.scss';

export const Pagination = ({
  items,
  setCurrentItems,
  itemsPerPage,
  resetPagination,
  setResetPagination,
}) => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [forcedPage, setForcedPage] = useState(0);

  useEffect(() => {
    if (resetPagination) {
      setItemOffset(0);
      setForcedPage(0);
      setResetPagination(false);
    }

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [
    itemOffset,
    itemsPerPage,
    setCurrentItems,
    items,
    resetPagination,
    setResetPagination,
    setForcedPage,
  ]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setForcedPage(event.selected);
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel='< prev'
        pageClassName={styles['page-item']}
        pageLinkClassName={styles['page-link']}
        previousClassName={styles['page-item']}
        previousLinkClassName={styles['page-link']}
        nextClassName={styles['page-item']}
        nextLinkClassName={styles['page-link']}
        breakLabel='...'
        breakClassName={styles['page-item']}
        breakLinkClassName={styles['page-link']}
        containerClassName={styles['pagination']}
        activeClassName={styles['active']}
        renderOnZeroPageCount={null}
        forcePage={forcedPage}
      />
    </>
  );
};
