import ReactPaginate from 'react-paginate';

import { useMediaQuery } from 'react-responsive';
import { useAppDispatch } from '../../redux/hook';
import { RefObject, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';
import styles from '../Home/AnimeList/styles.module.scss';
import { getAnimeGenresListThunk } from '../../redux/slices/Anime';
interface PaginationProps {
  AnimeContainerRef: RefObject<HTMLDivElement>;
  genresName: string | undefined;
}
const AnimeGenresPagination: React.FC<PaginationProps> = ({ AnimeContainerRef, genresName }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 461px)' }); // замените на свою логику для определения размера экрана
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' }); // замените на свою логику для определения размера экрана
  const isMiddleScreen = useMediaQuery({ query: '(max-width: 963px)' }); // замените на свою логику для определения размера экрана
  const isBigScreen = useMediaQuery({ query: '(max-width: 1200px)' }); // замените на свою логику для определения размера экрана
  const [firstRender, setFirstRender] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page') || '1', 10);
  const navigate = useNavigate();
  const [AnimeContainerTop, setAnimeContainerTop] = useState(0);
  useEffect(() => {
    if (AnimeContainerRef.current) {
      const rect = AnimeContainerRef.current.getBoundingClientRect();
      if (rect) {
        const { top } = rect;

        setAnimeContainerTop(top);
      }

      window.scrollTo(0, 0);

      setFirstRender(false);
    }
  }, [AnimeContainerRef.current]);
  useEffect(() => {
    // Обработка изменений параметров URL при навигации вперед/назад
    const updatedPage = parseInt(urlParams.get('page') || '1', 10);
    dispatch(
      getAnimeGenresListThunk({
        page: updatedPage,
        genresName: genresName ? genresName : 'Unknown',
      }),
    );
    window.scrollTo(0, 0);
  }, [location.search]);

  function handlePageSelect(selectedPage: { selected: number }) {
    const newPage = selectedPage.selected + 1;

    navigate(`?page=${newPage}`);

    if (!firstRender) {
      scroll.scrollTo(AnimeContainerTop, {
        duration: 500,
        smooth: 'easenOutQuad',
      });
    } else {
      setFirstRender(false);
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
    <div style={{ marginBottom: '4rem', marginRight: isPhoneScreen ? '50px' : '' }}>
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

export default AnimeGenresPagination;
