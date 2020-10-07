/**
 * SlotFill reference
 *
 * https://developer.wordpress.org/block-editor/developers/slotfills/
 * https://developer.wordpress.org/block-editor/designers-developers/developers/slotfills/plugin-document-setting-panel/
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

const DocumentPanel = () => (
	<>
		<h2>
			Notice Panel Set to Open
		</h2>
		<p>This is just a paragraph set in the Document Panel component.</p>
		<p>This is another paragraph set in the Document Panel component.</p>
	</>
);
const PostDocumentInfoPanel = () => (
	<>
	    <PluginDocumentSettingPanel
			name="document-panel"
			title="Document Panel"
			initialOpen={true}
			className="document-panel"
		>
			<div className="document-panel-content">
				<DocumentPanel />
			</div>
		</PluginDocumentSettingPanel>
	</>
);

registerPlugin( 'post-document-info-panel', {
	render: PostDocumentInfoPanel
} );
