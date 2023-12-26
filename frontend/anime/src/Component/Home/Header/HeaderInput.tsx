import styles from './styles.module.scss';
import React, { useState } from 'react';
import Autosuggest, { ChangeEvent, SuggestionsFetchRequestedParams } from 'react-autosuggest';
import HeaderSearchItem from './HeaderSearchItem';
import { useAppDispatch } from '../../../redux/hook';
import { getAnimeSeriaThunk } from '../../../redux/slices/Anime';
export interface Anime {
  title: string;
  imageUrl: string;
  desc: string;
  year: number;
  type: string;
  duration: string;
  // Добавьте другие поля, если необходимо
}
const AutoSuggestComponent: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Anime[]>([]);
  const dispatch = useAppDispatch();

  const getSuggestions = (): string => '';

  const onSuggestionsFetchRequested = async ({ value }: SuggestionsFetchRequestedParams) => {
    if (value.length > 3) {
      const response = await dispatch(getAnimeSeriaThunk({ title: value }));

      console.log('response from APi', response);
      setSuggestions(response.payload);
    }
  };
  const onChange = (_: React.FormEvent, { newValue }: ChangeEvent): void => setValue(newValue);
  const renderSuggestion = (suggestion: Anime): React.ReactNode => (
    <HeaderSearchItem suggestion={suggestion} />
  );

  const onSuggestionsClearRequested = (): void => setSuggestions([]);

  const inputProps = {
    placeholder: 'Поиск аниме...',
    value,
    onChange,
    className: styles.header_input,
  };

  return (
    <div className={styles.autosuggest_container}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestions}
        alwaysRenderSuggestions={true}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={(event, data) => console.log('123', data)}
        focusInputOnSuggestionClick={true}
        theme={{
          container: styles.autosuggest_container,
          suggestionsContainer: styles.suggestions_container,
          suggestionsList: styles.suggestionsList,
          suggestion: styles.suggestion_item,
          suggestionHighlighted: styles.suggestionItemHighlighted,
        }}
      />
    </div>
  );
};

export default AutoSuggestComponent;
