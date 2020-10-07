/**
 * SlotFill reference
 *
 * https://developer.wordpress.org/block-editor/developers/slotfills/
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/edit-post';

const PluginPostStatusInfoTest = () => (
    <PluginPostStatusInfo>
		<h2>Post Status Info SlotFill</h2>
		<p>Post Status Info SlotFill Text Paragraph</p>
    </PluginPostStatusInfo>
);

registerPlugin( 'post-status-info-test', { render: PluginPostStatusInfoTest } );
