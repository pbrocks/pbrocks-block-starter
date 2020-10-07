/**
 * SlotFill reference
 *
 * https://developer.wordpress.org/block-editor/developers/slotfills/
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { Button, Dropdown } from '@wordpress/components';

const MyDropdown = () => (
	<Dropdown
		className="my-container-class-name"
		contentClassName="my-popover-content-classname"
		position="bottom right"
		renderToggle={({ isOpen, onToggle }) => (
			<Button isPrimary onClick={onToggle} aria-expanded={isOpen}>
				Toggle Popover!
			</Button>
		)}
		renderContent={() => (
			<div>
				This is the content of the popover.
			</div>
		)}
	/>
);

const PluginPostStatusInfoDropdown = () => (
	<PluginPostStatusInfo>
		<MyDropdown />
		<p>Post Status Info SlotFill Text Paragraph</p>
	</PluginPostStatusInfo>
);

registerPlugin( 'post-status-info-dropdown', { render: PluginPostStatusInfoDropdown } );
