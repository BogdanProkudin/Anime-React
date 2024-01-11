import styles from './styles.module.scss';
import stylesLoader from '../Search/styles.module.scss';
import React, { FormEvent, useEffect, useState } from 'react';
import Autosuggest, { AutosuggestProps, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import HeaderSearchItem from './HeaderSearchItem';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAnimeSearchSeriaThunk } from '../../../redux/slices/Anime';
import { useNavigate } from 'react-router-dom';
export interface Anime {
  title: string;
  imageUrl: string;
  desc: string;
  year: number;
  type: string;
  duration: string;
}
const HeaderSmallScreenInput: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Anime[] | string[]>([]);
  const [loading, setLoading] = useState(false); // Новое состояние для отслеживания загрузки
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSuggestionsOpen, setSuggestionsOpen] = useState(false);

  useEffect(() => {
    setSuggestionsOpen(value.length > 0);
  }, [value]);
  const debouncedHandleInputChange = React.useCallback(
    debounce(async (Inputvalue: string) => {
      setLoading(true);
      if (Inputvalue.length > 3) {
        const response = await dispatch(getAnimeSearchSeriaThunk({ title: Inputvalue }));
        console.log('ЗАПРОС ВЫПОЛНЕН');
        if (response.payload.length > 0) {
          setSuggestions(response.payload.slice(0, 5));
        } else {
          setSuggestions(['Not Found']);
        }
        setLoading(false);
      }
    }, 1000),
    [],
  );

  const getSuggestions = (): string => '';

  const onSuggestionsFetchRequested = async ({ value }: SuggestionsFetchRequestedParams) => {};
  const onChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: Autosuggest.ChangeEvent,
  ): void => {
    setValue(newValue);
    setLoading(true);
    setSuggestions(['pending']);
    debouncedHandleInputChange(newValue);
  };

  const onSuggestionSelected = (_event: any, data: AnimeInfo | any) => {
    if (data.suggestion !== 'Not Found') {
      const AnimeTitle = data.suggestion.title_english;

      const AnimeImage = data.suggestion.images.jpg.image_url;
      navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
    }
  };
  const inputProps: AutosuggestProps<Anime, any>['inputProps'] = {
    placeholder: 'Search Anime ...',
    value: value,
    onChange: onChange,
    className: styles.header_small_screen_input,
  };
  const ViewAllAnime = () => {
    const SearchItems = value;
    navigate(`/results/${SearchItems}`);
    console.log('clicked on btn');

    setSuggestions([]);
    setValue('');
  };

  return (
    <div className={styles.header_small_screen_container}>
      <Autosuggest
        suggestions={suggestions as Anime[]}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        getSuggestionValue={getSuggestions}
        renderSuggestion={(suggestion: Anime): React.ReactNode => {
          return isSuggestionsOpen && loading ? (
            <div className={stylesLoader.loader}>Loading...</div>
          ) : (
            isSuggestionsOpen && !loading && <HeaderSearchItem suggestion={suggestion} />
          );
        }}
        inputProps={inputProps}
        onSuggestionSelected={(e, data) => onSuggestionSelected(e, data)}
        focusInputOnSuggestionClick={true}
        theme={{
          container: styles.autosuggest_small_screen_container,
          suggestionsContainer: styles.suggestions_container,
          suggestionsList: styles.suggestionsList,
          suggestion: styles.suggestion_small_screen_item,
          suggestionHighlighted: styles.suggestionItemHighlighted,
        }}
      />

      <button
        onClick={ViewAllAnime}
        className={styles.header_button_view_all}
        style={{
          top: '490px',
          position: 'absolute',
          left: '0',
          width: '100%',
          display: suggestions.length > 1 ? 'block' : 'none',
          zIndex: '999',
        }}
      >
        View all results
      </button>
    </div>
  );
};

export default HeaderSmallScreenInput;
