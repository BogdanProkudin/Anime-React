import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch } from '../../../redux/hook';
import { getAnimeListThunk } from '../../../redux/slices/Anime';
import { RefObject, useEffect, useState } from 'react';
interface PaginationProps {
  AnimeContainerRef: RefObject<HTMLDivElement>;
}
const Pagination: React.FC<PaginationProps> = ({ AnimeContainerRef }) => {
  const dispatch = useAppDispatch();
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 461px)' }); // замените на свою логику для определения размера экрана
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' }); // замените на свою логику для определения размера экрана
  const isMiddleScreen = useMediaQuery({ query: '(max-width: 963px)' }); // замените на свою логику для определения размера экрана
  const isBigScreen = useMediaQuery({ query: '(max-width: 1200px)' }); // замените на свою логику для определения размера экрана
  const [firstRender, setFirstRender] = useState(true);

  const [AnimeContainerTop, setAnimeContainerTop] = useState(0);
  useEffect(() => {
    if (AnimeContainerRef.current) {
      const rect = AnimeContainerRef.current.getBoundingClientRect();
      if (rect) {
        const { top } = rect;

        setAnimeContainerTop(top);
      }
    }
  }, []);

  function handlePageSelect(selectedPage: { selected: number }) {
    dispatch(
      getAnimeListThunk({
        currPage: selectedPage.selected + 2,
        limit: isPhoneScreen ? 6 : isSmallScreen ? 9 : 15,
      }),
    );

    if (!firstRender) {
      window.scrollTo({ top: AnimeContainerTop, behavior: 'smooth' });
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
    <div style={{ marginRight: isPhoneScreen ? '50px' : '' }}>
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
        initialPage={0}
      />
    </div>
  );
};

export default Pagination;
