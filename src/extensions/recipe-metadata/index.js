/**
 * WordPress dependencies
 */
import {
	CheckboxControl,
	Disabled,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { EntitySelectControl, IfPostType } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Metadata for recipe component
 *
 * @return {Object} A component consisting of metadata that belongs to recipe.
 */
const RecipeMetadata = () => {
	const [ submitterId ] = useMeta( 'submitter_id' );
	const [ sourceId, updateSourceId ] = useMeta( 'source_id' );
	const [ isSponsored, updateIsSponsored ] = useMeta( 'is_sponsored' );
	const [ sponsorEntity, updateSponsorEntity ] = useMeta( 'sponsor_entity' );
	const [ territory, setTerritory ] = useMeta( 'territory' );

	return (
		<IfPostType types={ [ 'recipe' ] }>
			<PluginDocumentSettingPanel
				icon="admin-users"
				name="recipeMetadata"
				title="Recipe Metadata"
			>
				<Disabled>
					<TextControl
						label="Submitter ID"
						value={ submitterId }
					/>
				</Disabled>
				<TextControl
					label="Source ID"
					onChange={ ( value ) => updateSourceId( value ) }
					value={ sourceId }
				/>
				<SelectControl
					label="Territory"
					onChange={ ( value ) => setTerritory( value ) }
					options={ [
						{ label: 'Argentina', value: 'argentina' },
						{ label: 'Asia Pacific', value: 'asia-pacific' },
						{ label: 'Australia', value: 'australia' },
						{ label: 'Brazil', value: 'brazil' },
						{ label: 'China', value: 'china' },
						{ label: 'France', value: 'france' },
						{ label: 'Germany', value: 'germany' },
						{ label: 'India', value: 'india' },
						{ label: 'Italy', value: 'italy' },
						{ label: 'Japan', value: 'japan' },
						{ label: 'Korea', value: 'korea' },
						{ label: 'Mexico', value: 'mexico' },
						{ label: 'Netherlands', value: 'netherlands' },
						{ label: 'Poland', value: 'poland' },
						{ label: 'Quebec', value: 'quebec' },
						{ label: 'Russia', value: 'russia' },
						{ label: 'United Kingdom', value: 'united-kingdom' },
						{ label: 'United States', value: 'united-states' },
					] }
					value={ territory }
				/>
			</PluginDocumentSettingPanel>
			<PluginDocumentSettingPanel
				icon="admin-users"
				name="sponsorData"
				title="Sponsor"
			>
				<CheckboxControl
					checked={ isSponsored }
					help={ 'When checked, content distribution will update to "Do Not Syndicate".' }
					label="This recipe is sponsored"
					onChange={ ( value ) => updateIsSponsored( value ) }
				/>
				{ isSponsored && (
					<EntitySelectControl
						isClearable
						label="Choose sponsor"
						onChange={ ( value ) => updateSponsorEntity( value?.id ?? '' ) }
						requestParams={ {
							brands: 'all',
							sort: false,
						} }
						types={ [ 'node-sponsor' ] }
						value={ sponsorEntity }
					/>
				) }
			</PluginDocumentSettingPanel>
		</IfPostType>
	);
};

registerPlugin( 'onecms-recipe-metadata', { render: RecipeMetadata } );
