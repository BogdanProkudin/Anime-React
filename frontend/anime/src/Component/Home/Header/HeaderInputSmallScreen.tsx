import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import Autosuggest, {
  AutosuggestProps,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest';
import HeaderSearchItem from './HeaderSearchItem';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAnimeSearchSeriaThunk } from '../../../redux/slices/Anime';
import { useNavigate } from 'react-router-dom';
import { AnimeInfo } from '../../../types/Home';
import styles from './styles.module.scss';
import stylesLoader from '../Search/styles.module.scss';

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
  suggestion: {
    title: any;
    title_english: string;
    images: { jpg: { image_url: string } };
  };
};
type HeaderSmallScreenInputProps = {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};
const HeaderSmallScreenInput: React.FC<HeaderSmallScreenInputProps> = ({ setIsSearchOpen }) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Anime[] | string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false); // Новое состояние для отслеживания фокуса
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isSuggestionsOpen, setSuggestionsOpen] = useState(false);

  useEffect(() => {
    setSuggestionsOpen(value.length > 0);
  }, [value, isInputFocused]);

  const debouncedHandleInputChange = React.useCallback(
    debounce(async (Inputvalue: string) => {
      setLoading(true);

      if (Inputvalue.length > 3) {
        const response = await dispatch(getAnimeSearchSeriaThunk({ title: Inputvalue }));

        if (response.payload.length > 0) {
          setSuggestions(response.payload.slice(0, 3).reverse());
        } else {
          setSuggestions(['Not Found']);
        }
        setLoading(false);
      }
    }, 1000),
    [],
  );
  const ViewAllAnime = () => {
    const SearchItems = value;
    navigate(`/Search/results/${SearchItems}`);

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

      const AnimeImage = data.suggestion.images ? data.suggestion.images.jpg.image_url : '';
      setIsSearchOpen(false);
      navigate(`/Video/${AnimeTitle}?image=${AnimeImage}`);
    }
  };

  const inputProps: AutosuggestProps<Anime, any>['inputProps'] = {
    placeholder: 'Search Anime ...',
    value: value,
    onChange: onChange,
    className: styles.header_small_screen_input,
    onFocus: () => setInputFocused(true), // Обновляем состояние при фокусировке на инпуте
    onBlur: () => setInputFocused(false), // Обновляем состояние при потере фокуса на инпуте
  };

  return (
    <div className={styles.header_small_screen_container}>
      <Autosuggest
        suggestions={suggestions as Anime[]}
        alwaysRenderSuggestions={value.length > 3 && true}
        getSuggestionValue={getSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        renderSuggestion={(suggestion: Anime): React.ReactNode => {
          return isSuggestionsOpen && loading ? (
            <div className={stylesLoader.loader}>Loading...</div>
          ) : (
            isSuggestionsOpen && !loading && <HeaderSearchItem suggestion={suggestion} />
          );
        }}
        inputProps={inputProps}
        onSuggestionSelected={(e, data) => onSuggestionSelected(e, data)}
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
          top: '460px',
          position: 'absolute',
          left: '0',
          width: '100%',
          display: suggestions.length >= 3 ? 'block' : 'none',
          zIndex: '999',
        }}
      >
        View all results
      </button>
    </div>
  );
};

export default HeaderSmallScreenInput;
