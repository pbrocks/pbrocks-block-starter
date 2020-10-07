/**
 * WordPress dependencies
 */
import { SelectControl, TextControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import { every, get, includes, partial, uniq } from 'lodash';

/**
 * Internal dependencies
 */
import { IfBrandSupports, IfPostTypeSupports, ImageControl, SortableList, TermSelectControl } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import Term from './term.js';

/**
 * Metadata for aggregate component
 *
 * @return {Object} A component consisting of metadata that belongs to aggregate.
 */
const AggregateFieldsPanel = () => {
	const [ variant, updateVariant ] = useMeta( 'aggregate_page_variant' );
	const [ subVariant, updateSubVariant ] = useMeta( 'aggregate_page_sub_variant' );
	const [ editProgramName, updateEditProgramName ] = useMeta( 'aggregate_page_edit_program_name' );
	const [ editProgramLogoId, updateEditProgramLogoId ] = useMeta( 'aggregate_page_edit_program_logo_id' );
	const [ subNavigation, updateSubNavigation ] = useMeta( 'subnav_toggle' );
	const [ subcategoryOverrides, updateSubcategoryOverrides ] = useMeta( 'subcategory_overrides' );

	const settings = useSelect( ( select ) => select( 'core/editor' ).getEditorSettings() );
	const supports = get( settings, 'onecms.brand.supports', [] );

	const variantTypes = [
		{ label: 'Core', value: 'core' },
		{ label: 'Faceted Search', value: 'faceted-search' },
		{ label: 'Evergreen Content', value: 'evergreen' },
	];

	if ( every( [ 'category-variant-food' ], partial( includes, supports ) ) ) {
		variantTypes.splice( 1, 0, { label: 'Food', value: 'food' } );
	}

	/**
	 * Adding a single term for subcategory overrides.
	 *
	 * @param {Object} newTerm The term to add to the list.
	 */
	const addSubcategoryOverrides = ( newTerm ) => {
		updateSubcategoryOverrides( uniq( [
			...subcategoryOverrides,
			newTerm.id,
		] ) );
	};

	return (
		<IfPostTypeSupports features={ [ 'onecms-aggregate-fields' ] }>
			<PluginDocumentSettingPanel
				icon="edit"
				name="onecms-aggregate-fields"
				title="Variant"
			>
				<SelectControl
					help="Aggregate variant type"
					label="Variant"
					onChange={ ( value ) => updateVariant( value ) }
					options={ variantTypes }
					value={ variant }
				/>
				<SelectControl
					help="Aggregate sub-variant type"
					label="Sub-Variant"
					onChange={ ( value ) => updateSubVariant( value ) }
					options={ [
						{ label: 'Default', value: 'default' },
						{ label: 'Edit Program', value: 'edit-program' },
					] }
					value={ subVariant }
				/>
				{ subVariant === 'edit-program' && (
					<SelectControl
						help="Aggregate Subnavigation On/Off"
						label="Sub-Navigation"
						onChange={ ( value ) => updateSubNavigation( value ) }
						options={ [
							{ label: 'Off', value: 'off' },
							{ label: 'On', value: 'on' },
						] }
						value={ subNavigation }
					/>
				) }
			</PluginDocumentSettingPanel>

			{ subVariant === 'edit-program' && (
				<PluginDocumentSettingPanel
					icon="edit"
					name="onecms-aggregate-edit-program-fields"
					title="Edit Program"
				>
					<TextControl
						label="Edit Program Name"
						onChange={ ( value ) => updateEditProgramName( value ) }
						value={ editProgramName }
					/>
					<ImageControl
						image={ editProgramLogoId }
						label="Edit Program Logo"
						onSelect={ ( value ) => {
							const properValue = ( value.id === undefined ) ? '' : value.id.toString();

							updateEditProgramLogoId( properValue );
						} }
					/>
				</PluginDocumentSettingPanel>
			) }

			<IfBrandSupports features={ [ 'subcategory_overrides' ] }>
				<PluginDocumentSettingPanel
					icon="edit"
					name="aggregate-subcategory-overrides"
					title="Subcategory Overrides"
				>
					<SortableList
						items={ subcategoryOverrides }
						onChange={ updateSubcategoryOverrides }
						renderItem={ ( { item } ) => (
							<Term
								id={ item }
							/>
						) }
					/>
					<TermSelectControl
						label="Category"
						onChange={ addSubcategoryOverrides }
						query={ {
							order: 'desc',
							orderby: 'count',
						} }
						taxonomy="category"
					/>
					<TermSelectControl
						label="Tag"
						onChange={ addSubcategoryOverrides }
						query={ {
							order: 'desc',
							orderby: 'count',
						} }
						taxonomy="post_tag"
					/>
				</PluginDocumentSettingPanel>
			</IfBrandSupports>
		</IfPostTypeSupports>
	);
};

registerPlugin( 'onecms-aggregate-fields', { render: AggregateFieldsPanel } );
