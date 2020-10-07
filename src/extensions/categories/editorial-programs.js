/**
 * WordPress dependencies
 */
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import { EntitySelectControl, TermSelectControl } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { get } from 'lodash';

/**
 * The Editorial Program sidebar panel.
 *
 * @return {Object} The editorial program fields.
 */
const EditorialPrograms = () => {
	const [ editorialProgramType, updateEditorialProgramType ] = useMeta( 'editorial_program_type' );
	const [ editorialProgramCategory, updateEditorialProgramCategory ] = useMeta( 'editorial_program_category' );
	const [ editorialProgramTag, updateEditorialProgramTag ] = useMeta( 'editorial_program_tag' );
	const [ editorialProgramCw, updateEditorialProgramCw ] = useMeta( 'editorial_program_cw' );

	const { onecms } = useSelect( ( select ) => select( 'core/editor' ).getEditorSettings() );

	const supports = get( onecms, 'brand.supports', [] );

	const options = [
		{ label: 'Category', value: 'category' },
	];

	if ( supports.includes( 'onecms-editorial-programs-metabox-tag' ) ) {
		options.push( { label: 'Tag', value: 'tag' } );
	}

	if ( supports.includes( 'onecms-editorial-programs-metabox-creative-work' ) ) {
		options.push( { label: 'Creative Work', value: 'cw' } );
	}

	return (
		<PanelBody
			initialOpen={ true }
			title="Editorial Programs"
		>
			{ ( options.length > 1 ) && (
				<SelectControl
					label="Type of Editorial Program"
					onChange={ ( value ) => updateEditorialProgramType( value ) }
					options={ options }
					value={ editorialProgramType }
				/>
			) }

			{ ( editorialProgramType === 'category' ) && (
				<TermSelectControl
					isClearable={ true }
					label="Category"
					onChange={ ( value ) => updateEditorialProgramCategory( value ? value.id : null ) }
					taxonomy="category"
					value={ editorialProgramCategory }
				/>
			) }

			{ ( editorialProgramType === 'tag' ) && (
				<TermSelectControl
					isClearable={ true }
					label="Tags"
					onChange={ ( value ) => updateEditorialProgramTag( value ? value.id : null ) }
					taxonomy="post_tag"
					value={ editorialProgramTag }
				/>
			) }

			{ ( editorialProgramType === 'cw' ) && (
				<EntitySelectControl
					isClearable={ true }
					label="Creative Work"
					onChange={ ( value ) => updateEditorialProgramCw( value ? value.id : null ) }
					types={ [ 'node-creative-work' ] }
					value={ editorialProgramCw }
				/>
			) }
		</PanelBody>
	);
};

export default EditorialPrograms;
