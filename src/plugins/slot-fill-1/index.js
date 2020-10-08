/**
 * SlotFill reference
 *
 * https://developer.wordpress.org/block-editor/developers/slotfills/
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostPublishPanel } from '@wordpress/edit-post';

const PluginPostPublishPanelProof = () => (
	<PluginPostPublishPanel>
		<h2>Proving Post Publish Panel</h2>
        <p>Purported Post Publish Panel paragraph provided purposefully</p>
    </PluginPostPublishPanel>
);

registerPlugin( 'post-publish-panel-test', {
    render: PluginPostPublishPanelProof,
} );
