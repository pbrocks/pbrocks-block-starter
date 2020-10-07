/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

/**
 * External dependencies
 */
import { IfPostTypeSupports } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Sidebar panel for OneCMS UGC fields.
 *
 * @return {Object} The UGC fields.
 */
const UgcFieldsSidebar = () => {
	const [ disableComments, updateDisableComments ] = useMeta( 'disable_comments_checkbox' );

	return (
		<IfPostTypeSupports features={ [ 'onecms-ugc-fields' ] }>
			<PluginDocumentSettingPanel
				icon="admin-comments"
				name="onecms-ugc-fields"
				title="UGC Settings"
			>
				<CheckboxControl
					label="Disable Comments"
					onChange={ ( value ) => {
						// "on" === disable. "off" === enable. It's reversed.
						updateDisableComments( value ? 'on' : 'off' );
					} }
					value={ ( disableComments === 'on' ) ? true : false }
				/>
			</PluginDocumentSettingPanel>
		</IfPostTypeSupports>
	);
};

registerPlugin( 'onecms-ugc-fields', { render: UgcFieldsSidebar } );
