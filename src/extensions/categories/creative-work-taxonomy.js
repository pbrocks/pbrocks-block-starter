/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';

/**
 * External dependencies
 */
import { EntitySelectControl, IfBrandSupports, SortableList } from '@meredithcorp/onecms-components';
import { uniq } from 'lodash';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Internal dependencies
 */
import Entity from './entity.js';

/**
 * The Content Property panel.
 *
 * @return {Object} The Content Property fields.
 */
const CreativeWork = () => {
	const [ creativeWork, updateCreativeWork ] = useMeta( 'onecms_creative_work_entities' );

	/**
	 * Adding a single item for content Property.
	 *
	 * @param {Object} item The value to add to the list.
	 */
	const addCreativeWork = ( item ) => {
		updateCreativeWork( uniq( [
			...creativeWork,
			item.id,
		] ) );
	};

	return (
		<IfBrandSupports features={ [ 'onecms-creative-works' ] }>
			<PanelBody
				initialOpen={ true }
				title="Creative Works"
			>
				<SortableList
					items={ creativeWork }
					onChange={ ( items ) => updateCreativeWork( items ) }
					renderItem={ ( { item } ) => (
						<Entity
							id={ item }
						/>
					) }
				/>

				<EntitySelectControl
					label="Creative Work Entities"
					onChange={ ( value ) => addCreativeWork( value ) }
					types={ [ 'node-creative-work' ] }
					value={ null }
				/>
			</PanelBody>
		</IfBrandSupports>
	);
};

export default CreativeWork;
