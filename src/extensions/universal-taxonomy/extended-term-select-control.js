/**
 * External dependencies
 */
import debounce from 'debounce-async';
import { default as Select } from 'react-select/async';

/**
 * Internal dependencies
 */
import searchTerms from './search-term';
import Term from './term';
import { SortableList } from '@meredithcorp/onecms-components';

/**
 * A search/select control for term names.
 *
 * @param {Object} props The object props.
 * @return {Object} The searchable select field.
 */
const TermSelectControl = ( props ) => {
	const {
		filter,
		onChange,
	} = props;

	return (
		<Select
			getOptionLabel={ ( value ) => value.value }
			getOptionValue={ ( value ) => value.id }
			loadOptions={ debounce( ( value ) => searchTerms( value, filter ), 300 ) }
			noOptionsMessage={ ( { inputValue } ) => {
				return inputValue.length > 1 ? 'No terms were found' : 'Type to start searching';
			} }
			onChange={ onChange }
			value={ null }
		/>
	);
};

/**
 * An Extended version of TermSelectControl with Multi-Select sortable.
 *
 * @param {Object} props The object props.
 * @return {Object} The searchable select field.
 */
const ExtendedTermSelectControl = ( props ) => {
	const {
		filter,
		items,
		onChangeSortable,
		onChangeTerm,
	} = props;

	return (
		<>
			<SortableList
				items={ items }
				onChange={ onChangeSortable }
				renderItem={ ( { item, index } ) => (
					<Term
						id={ item }
						index={ index }
					/>
				) }
			/>
			<TermSelectControl
				filter={ filter }
				onChange={ onChangeTerm }
			/>
		</>
	);
};

export default ExtendedTermSelectControl;
