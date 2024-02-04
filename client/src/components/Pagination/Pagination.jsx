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
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = Number(searchParams.get('page'));

  // Update itemOffset when the page parameter changes
  useEffect(() => {
    const newOffset = (page - 1) * itemsPerPage;
    setItemOffset(newOffset);
  }, [page, itemsPerPage]);

  const handlePageClick = (event) => {
    // Update the URL with the new page
    setSearchParams({ page: event.selected + 1 });
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
        forcePage={page-1}
      />
    </>
  );
}