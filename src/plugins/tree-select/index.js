/**
 * SlotFill reference
 *
 * https://developer.wordpress.org/block-editor/developers/slotfills/
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { TreeSelect } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const PostStati = withState({
	status: 'unapproved',
})(({ status, setState }) => (
	<TreeSelect
		label="Post status"
		noOptionLabel="No post status"
		onChange={(status) => setState({ status })}
		selectedId={status}
		tree={[
			{
				name: 'Publish',
				id: 'publish',
			},
			{
				name: 'Draft',
				id: 'draft',
			},
			{
				name: 'Future',
				id: 'future',
			},
			{
				name: 'Private',
				id: 'private',
			},
			{
				name: 'Trash',
				id: 'trash',
			},
			{
				name: 'Auto Draft',
				id: 'auto-draft',
			},
			{
				name: 'Featured',
				id: 'featured',
			},
			{
				name: 'Unapproved',
				id: 'unapproved',
			},
			{
				name: 'Approved',
				id: 'approved',
			},
		]}
	/>
));

const PluginPostStatusTreeSelect = () => (
	<PluginPostStatusInfo>
		<PostStati />
	</PluginPostStatusInfo>
);

registerPlugin( 'post-status-tree-select', { render: PluginPostStatusTreeSelect } );
