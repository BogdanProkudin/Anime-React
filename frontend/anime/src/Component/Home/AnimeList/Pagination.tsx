import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch } from '../../../redux/hook';

import { RefObject, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';
import { toast } from 'react-toastify';
import { off } from 'process';
import { useGetAnimeListQuery } from '../../../redux/slices/AnimeApi';
interface PaginationProps {
  AnimeContainerRef: RefObject<HTMLDivElement>;
}
const Pagination: React.FC<PaginationProps> = ({ AnimeContainerRef }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 461px)' }); // замените на свою логику для определения размера экрана
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' }); // замените на свою логику для определения размера экрана
  const isMiddleScreen = useMediaQuery({ query: '(max-width: 963px)' }); // замените на свою логику для определения размера экрана
  const isBigScreen = useMediaQuery({ query: '(max-width: 1200px)' }); // замените на свою логику для определения размера экрана

  const hasDataLoaded = localStorage.getItem('hasDataLoaded09');
  const storedSliderData = hasDataLoaded !== null ? JSON.parse(hasDataLoaded) : [];
  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page') || '1', 10);
  const [firstRender, setFirstRender] = useState(true);
  const navigate = useNavigate();

  async function handlePageSelect(selectedPage: { selected: number }) {
    try {
      const newPage = selectedPage.selected + 1;
      const limit = isPhoneScreen ? 12 : isSmallScreen ? 16 : 16;
      const updatedPage = parseInt(urlParams.get('page') || '1', 10);

      if (!firstRender) {
        const scrollTo = AnimeContainerRef.current?.offsetTop
          ? AnimeContainerRef.current.offsetTop
          : 0;
        scroll.scrollTo(scrollTo, {
          duration: 500,
          smooth: 'easeInOutQuad',
        });
      } else {
        setFirstRender(false);
      }

      navigate(`?page=${newPage}&limit=${limit}`);
    } catch (error) {
      toast.error('Произошла ошибка! Попробуйте снова.');
    }
  }

  const pageRangeDisplayed = isPhoneScreen
    ? 3
    : isSmallScreen
    ? 6
    : isMiddleScreen
    ? 8
    : isBigScreen
    ? 10
    : 15;

  return (
    <div style={{ marginRight: isPhoneScreen ? '50px' : '', marginBottom: '3rem' }}>
      <ReactPaginate
        pageCount={1735}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={0}
        previousLabel={null}
        nextLabel={null}
        breakLabel={null}
        nextLinkClassName={styles.hidden_next_button}
        previousLinkClassName={styles.hidden_next_button}
        onPageChange={handlePageSelect}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        initialPage={currentPage - 1}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
