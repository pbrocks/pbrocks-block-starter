/**
 * SlotFill reference
 *
 * https://developer.wordpress.org/block-editor/developers/slotfills/
 * https://developer.wordpress.org/block-editor/designers-developers/developers/slotfills/plugin-developer-setting-panel/
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

// import { EntityInnerBlocks, EntryPageContext } from 'components';
// import { useSelect } from '@wordpress/data';
// import { get } from 'lodash';
// import { useMeta } from '@meredithcorp/onecms-utils';

// const entryPagePost = wp.data.select('core/editor').getCurrentPostId();

const DeveloperPanelContent = () => (
	<>
		<h2>
			Developer Panel Contents
		</h2>
		<p>This is just a paragraph set in the Developer Panel component.</p>
		<p>PostType = {wp.data.select('core/editor').getCurrentPostType()}</p>
		<p>PostID = {wp.data.select('core/editor').getCurrentPostId()}</p>
	</>
);
const PostDeveloperInfoPanel = () => (
	<>
	    <PluginDocumentSettingPanel
			name="developer-panel"
			title="Developer Panel"
			initialOpen={false}
			icon="palmtree"
			className="developer-panel"
		>
			<div className="developer-panel-content">
				<DeveloperPanelContent />
			</div>
		</PluginDocumentSettingPanel>
	</>
);

registerPlugin( 'post-developer-info-panel', {
	render: PostDeveloperInfoPanel
} );
