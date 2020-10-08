/**
 * WordPress dependencies
 */
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { TextControl } from '@wordpress/components';

/**
 * External dependencies
 */
import { IfPostType } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Swearby Story Metadata for Story component
 *
 * @return {Object} A component consisting of settings that belongs to rule.
 */
const StoryMetadata = () => {
	const [ userSwearbyStoryReference, updateUserSwearbyStoryReference ] = useMeta( 'user_swearby_story_reference' );

	return (
		<IfPostType types={ [ 'swearby_story' ] }>
			<PluginDocumentSettingPanel
				icon="admin-links"
				name="swearbyStoryMetadata"
				title="Swearby Story Metadata"
			>
				<TextControl
					label="User Swearby Story Reference"
					onChange={ ( value ) => updateUserSwearbyStoryReference( value ) }
					value={ userSwearbyStoryReference }
				/>
			</PluginDocumentSettingPanel>
		</IfPostType>
	);
};

registerPlugin( 'onecms-story-metadata', { render: StoryMetadata } );
