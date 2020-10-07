/**
 * SlotFill reference
 *
 * https://developer.wordpress.org/block-editor/developers/slotfills/
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { Button, ButtonGroup } from '@wordpress/components';

const PreviewButtonGroup = () => (
	<ButtonGroup>
		<Button isPrimary>Primary</Button>
		<Button isSecondary>Secondary</Button>
	</ButtonGroup>
);
const PreviewButtonInStatusBox = () => (
    <PluginPostStatusInfo>
		<h2>Preview Button</h2>
		<PreviewButtonGroup />
		<p>Preview Button Text Paragraph</p>
    </PluginPostStatusInfo>
);

registerPlugin( 'post-status-preview-button', { render: PreviewButtonInStatusBox } );
