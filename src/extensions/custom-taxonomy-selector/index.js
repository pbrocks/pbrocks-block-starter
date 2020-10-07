/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';

/**
 * External dependencies
 */
import { get, uniq } from 'lodash';
import { SortableList, TermSelectControl } from '@meredithcorp/onecms-components';

/**
 * The term component.
 *
 * @param {Object} props The component props.
 * @return {Object} The individual item.
 */
const Term = ( props ) => {
	const {
		id,
		taxonomySlug,
	} = props;

	const term = useSelect( ( select ) => select( 'core' ).getEntityRecord( 'taxonomy', taxonomySlug, id ), [ id ] );

	return (
		<div>
			{ get( term, 'name', 'Loading...' ) }
		</div>
	);
};

/**
 * The term selector component.
 *
 * @param {Object} props The component props.
 * @return {Object} The selector UI.
 */
const Selector = ( props ) => {
	const {
		slug,
		taxonomy: {
			rest_base: taxonomyRestBase,
			slug: taxonomySlug,
		},
		terms,
	} = props;

	const { editPost } = useDispatch( 'core/editor' );

	/**
	 * Adding a single term.
	 *
	 * @param {Object} term The value to add to the list.
	 */
	const addTerm = ( term ) => {
		const value = [
			...terms,
			term.id,
		];

		editPost( { [ taxonomyRestBase ]: uniq( value ) } );
	};

	/**
	 * Adding a single term.
	 *
	 * @param {Array} values The list of all terms.
	 */
	const setTerms = ( values ) => {
		editPost( { [ taxonomyRestBase ]: uniq( values ) } );
	};

	return (
		<>
			<SortableList
				items={ terms }
				onChange={ setTerms }
				renderItem={ ( { item } ) => (
					<Term
						id={ item }
						taxonomySlug={ taxonomySlug }
					/>
				) }
			/>

			<TermSelectControl
				onChange={ ( value ) => addTerm( value ) }
				query={ {
					order: 'desc',
					orderby: 'count',
					per_page: 100,
				} }
				taxonomy={ slug }
			/>
		</>
	);
};

/**
 * The term selector filter handler.
 *
 * @return {Function} A function which returns a component.
 */
const CustomTaxonomySelector = () => {
	return ( props ) => (
		<Selector { ...props } />
	);
};

addFilter( 'editor.PostTaxonomyType', 'onecms/customTaxonomySelector', CustomTaxonomySelector );
