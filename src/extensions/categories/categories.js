/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';

/**
 * External dependencies
 */
import { SortableList, TermSelectControl } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { FieldValidationMessages } from 'components';
import { uniq } from 'lodash';

/**
 * Internal dependencies
 */
import Term from './term.js';

/**
 * The Category sidebar panel.
 *
 * @return {Object} The primary and secondary category fields.
 */
const Categories = () => {
	const [ primaryCategory, updatePrimaryCategory ] = useMeta( 'primary_category' );
	const [ secondaryCategory, updateSecondaryCategory ] = useMeta( 'secondary_categories' );

	/**
	 * Adding a single term for secondary category.
	 *
	 * @param {Object} term The value to add to the list.
	 */
	const addSecondaryCategory = ( term ) => {
		updateSecondaryCategory( uniq( [
			...secondaryCategory,
			term.id,
		] ) );
	};

	return (
		<PanelBody
			initialOpen={ true }
			title="Categories"
		>
			<TermSelectControl
				help="(Required) Main category from category tree. Used to determine content URL and to place content on section and aggregate pages."
				label="Primary Category"
				onChange={ ( value ) => updatePrimaryCategory( value.id ) }
				query={ {
					order: 'desc',
					orderby: 'count',
				} }
				taxonomy="category"
				value={ primaryCategory }
			/>
			<FieldValidationMessages
				context="onecms-categories"
				field="primaryCategory"
			/>

			<SortableList
				items={ secondaryCategory }
				onChange={ ( items ) => updateSecondaryCategory( items ) }
				renderItem={ ( { item } ) => (
					<Term
						id={ item }
						taxonomy="category"
					/>
				) }
			/>
			<TermSelectControl
				label="Secondary Categories"
				onChange={ ( value ) => addSecondaryCategory( value ) }
				query={ {
					order: 'desc',
					orderby: 'count',
				} }
				taxonomy="category"
			/>
		</PanelBody>
	);
};

export default Categories;
