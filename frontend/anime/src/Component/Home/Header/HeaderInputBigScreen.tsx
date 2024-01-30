import styles from './styles.module.scss';
import stylesLoader from '../Search/styles.module.scss';
import React, { FormEvent, useEffect, useState } from 'react';
import Autosuggest, { AutosuggestProps, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import HeaderSearchItem from './HeaderSearchItem';
import { debounce, flatMap } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAnimeSearchSeriaThunk } from '../../../redux/slices/Anime';
import { useNavigate } from 'react-router-dom';
import { AnimeInfo } from '../../../types/Home';
import { IoIosSearch } from 'react-icons/io';
export interface Anime {
  title_english: string;
  images: { jpg: { image_url: string } };
  title: string;

  imageUrl: string;
  desc: string;
  year: number;
  type: string;
  duration: string;
}
type suggestionType = {
  suggestion: { title_english: string; images: { jpg: { image_url: string } }; title: string };
};

const HeaderInputBigScreen: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Anime[] | string[]>([]);
  const [loading, setLoading] = useState(false); // Новое состояние для отслеживания загрузки
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSuggestionsOpen, setSuggestionsOpen] = useState(false);

  const [isButtonOpen, setIsButtonOpen] = useState(false);
  useEffect(() => {
    setSuggestionsOpen(value.length > 0);
  }, [value]);
  const debouncedHandleInputChange = React.useCallback(
    debounce(async (Inputvalue: string) => {
      setLoading(true);
      if (Inputvalue.length > 3) {
        const response = await dispatch(getAnimeSearchSeriaThunk({ title: Inputvalue }));

        if (response.payload.length > 0) {
          setSuggestions(response.payload.slice(0, 5));
          if (response.payload.length > 5) {
            setIsButtonOpen(true);
          }
        } else {
          setSuggestions(['Not Found']);
          setIsButtonOpen(false);
        }
        setLoading(false);
      }
    }, 1000),
    [],
  );
  const ViewAllAnime = () => {
    const SearchItems = value;
    navigate(`/Search/results/${SearchItems}`);

    setIsButtonOpen(false);
    setSuggestions([]);
    setValue('');
  };

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

  const onSuggestionSelected = async (_event: any, data: suggestionType) => {
    if (
      typeof data.suggestion !== 'string' &&
      'title_english' in data.suggestion &&
      'images' in data.suggestion
    ) {
      const AnimeTitle = data.suggestion.title_english
        ? data.suggestion.title_english
        : data.suggestion.title;
      setIsButtonOpen(false);
      const AnimeImage = data.suggestion.images ? data.suggestion.images.jpg.image_url : '';
      navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
    }
  };
  const inputProps: AutosuggestProps<Anime, any>['inputProps'] = {
    placeholder: `Search ... `,
    value: value,
    onChange: onChange,
    className: styles.header_input,
  };

  return (
    <div className={styles.autosuggest_container}>
      <Autosuggest
        suggestions={suggestions as Anime[]}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        getSuggestionValue={getSuggestions}
        renderSuggestion={(suggestion: Anime): React.ReactNode => {
          return loading ? (
            <div className={stylesLoader.loader}>Loading...</div>
          ) : (
            <>
              <HeaderSearchItem suggestion={suggestion} />
            </>
          );
        }}
        inputProps={inputProps}
        onSuggestionSelected={(e, data) => onSuggestionSelected(e, data)}
        focusInputOnSuggestionClick={true}
        theme={{
          container: styles.autosuggest_container,
          suggestionsContainer: styles.suggestions_container,
          suggestionsList: styles.suggestionsList,
          suggestion: styles.suggestion_item,
          suggestionHighlighted: styles.suggestionItemHighlighted,
        }}
      />
      <div>
        <button
          onClick={ViewAllAnime}
          className={styles.header_button_view_all}
          style={{
            display: suggestions.length > 3 ? 'block' : 'none',
          }}
        >
          View all results
        </button>
      </div>
    </div>
  );
};

export default HeaderInputBigScreen;
