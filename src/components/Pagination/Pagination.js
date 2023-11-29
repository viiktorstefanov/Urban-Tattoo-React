import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';
import Items from './Items';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useSearchParams } from 'react-router-dom';

export function PaginatedItems({ itemsPerPage, tattoos, openFullImg }) {
  const items = tattoos;
  const [itemOffset, setItemOffset] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Get the 'page' query parameter from the URL and set the currentPage state
    const page = parseInt(searchParams.get('page'), 10) || 1;
    setCurrentPage(page - 1); // Adjust to 0-based index
  }, [searchParams]);

  // handle of page number click.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);

    // Use setSearchParams function to update the 'page' query parameter
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set('page', (event.selected + 1).toString());
      return prevSearchParams;
    });

    // Manually update the current page state for synchronous navigation
    setCurrentPage(event.selected);
  };

  return (
    <>
      <Items currentItems={items.slice(itemOffset, itemOffset + itemsPerPage)} openFullImg={openFullImg}/>
      <ReactPaginate
        className={styles.pagination}
        breakLabel={<BsThreeDots className={styles['pagination-dots-break']} />}
        nextLabel={<FaArrowRight className={styles['pagination-arrow-next']}/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(items.length / itemsPerPage)}
        previousLabel={<FaArrowLeft className={styles['pagination-arrow-previous']} />}
        renderOnZeroPageCount={null}
        activeClassName={styles['activeClassName']}
        activeLinkClassName={styles['activeLinkClassName']}
        disabledClassName={styles['previous-next-disabled']}
        disabledLinkClassName={styles['previous-next-link-disabled']}
        forcePage={currentPage}
      />
    </>
  );
}