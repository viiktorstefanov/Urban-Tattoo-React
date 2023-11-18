import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';
import Items from './Items';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

export function PaginatedItems({ itemsPerPage, tattoos, openFullImg }) {

  const items = tattoos;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // handle of page number click.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} openFullImg={openFullImg}/>
      <ReactPaginate
      className={styles.pagination}
        breakLabel={<BsThreeDots className={styles['pagination-dots-break']} />}
        nextLabel={<FaArrowRight className={styles['pagination-arrow-next']}/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FaArrowLeft className={styles['pagination-arrow-previous']} />}
        renderOnZeroPageCount={null}
        activeClassName={styles['activeClassName']}
        activeLinkClassName={styles['activeLinkClassName']}
        disabledClassName={styles['previous-next-disabled']}
        disabledLinkClassName={styles['previous-next-link-disabled']}
      />
    </>
  );
};
