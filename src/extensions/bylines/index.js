/**
 * WordPress dependencies
 */
import { PanelBody, TextControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import Byline from './byline.js';

/**
 * External dependencies
 */
import { ExtensionSidebar, SortableList, TermSelectControl } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { cloneDeep, uniqBy } from 'lodash';

/**
 * Sidebar for OneCMS bylines.
 *
 * @return {Object} The sidebar.
 */
const BylinesSidebar = () => {
	const { setAuthor } = useDispatch( 'onecms/authors' );

	const DEFAULT_DESIGNATION = 'author';

	const [ primaryBylineGroup, updatePrimaryBylineGroup ] = useMeta( 'primary_byline_group' );
	const [ secondaryBylineGroup, updateSecondaryBylineGroup ] = useMeta( 'secondary_byline_group' );
	const [ originalSource, updateOriginalSource ] = useMeta( 'meta_original_source' );
	const [ primaryBylineOverride, updatePrimaryBylineOverride ] = useMeta( 'meta_byline_override' );
	const [ secondaryBylineOverride, updateSecondaryBylineOverride ] = useMeta( 'meta_secondary_byline_override' );

	/**
	 * Takes an array of byline values, and adds a new value
	 * while also deduping the bylines by ID.
	 *
	 * @param {Array} values The byline values.
	 * @param {Object} newValue The value to add to the list.
	 * @return {Object} The updated group.
	 */
	const addBylineToGroup = ( values, newValue ) => {
		return uniqBy(
			[
				...values,
				{
					id: newValue.id.toString(),
					designation: DEFAULT_DESIGNATION,
				},
			],
			( item ) => item.id,
		);
	};

	return (
		<ExtensionSidebar
			icon="groups"
			name="onecms-bylines"
			title="OneCMS Bylines"
		>
			<PanelBody
				initialOpen={ true }
				title="Primary Bylines (limit 2)"
			>
				<SortableList
					items={ primaryBylineGroup }
					onChange={ ( items ) => updatePrimaryBylineGroup( items ) }
					renderItem={ ( { item, index } ) => (
						<Byline
							index={ index }
							item={ item }
							onChange={ ( value ) => {
								const clone = cloneDeep( primaryBylineGroup );

								clone[ index ].designation = value;
								updatePrimaryBylineGroup( clone );
							} }
						/>
					) }
				/>

				<TermSelectControl
					isDisabled={ primaryBylineGroup.length >= 2 }
					label="Pick an author"
					onChange={ ( value ) => {
						/**
						 * Add the author object to the store so it appears
						 * in the byline list without any loading delay.
						 */
						setAuthor( value.id, value );

						updatePrimaryBylineGroup( addBylineToGroup( primaryBylineGroup, value ) );
					} }
					taxonomy="onecms-author"
				/>

				<TextControl
					label="Primary Byline Override"
					onChange={ ( value ) => updatePrimaryBylineOverride( value ) }
					value={ primaryBylineOverride }
				/>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title="Secondary Bylines"
			>
				<SortableList
					items={ secondaryBylineGroup }
					onChange={ ( items ) => updateSecondaryBylineGroup( items ) }
					renderItem={ ( { item, index } ) => (
						<Byline
							index={ index }
							item={ item }
							onChange={ ( value ) => {
								const clone = cloneDeep( secondaryBylineGroup );

								clone[ index ].designation = value;
								updateSecondaryBylineGroup( clone );
							} }
						/>
					) }
				/>

				<TermSelectControl
					label="Pick an author"
					onChange={ ( value ) => {
						/**
						 * Add the author object to the store so it appears
						 * in the byline list without any loading delay.
						 */
						setAuthor( value.id, value );

						updateSecondaryBylineGroup( addBylineToGroup( secondaryBylineGroup, value ) );
					} }
					taxonomy="onecms-author"
				/>

				<TextControl
					label="Secondary Byline Override"
					onChange={ ( value ) => updateSecondaryBylineOverride( value ) }
					value={ secondaryBylineOverride }
				/>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title="Original Source"
			>
				<TextControl
					onChange={ ( value ) => updateOriginalSource( value ) }
					value={ originalSource }
				/>
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-bylines', { render: BylinesSidebar } );
