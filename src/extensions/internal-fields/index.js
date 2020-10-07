/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

/**
 * External dependencies
 */
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Sidebar for OneCMS internal metadata fields.
 *
 * @return {Object} The UDF dev tools.
 */
const InternalFieldsSidebar = () => {
	const [ internalHeadline, updateInternalHeadline ] = useMeta( 'internal_headline' );

	return (
		<PluginDocumentSettingPanel
			icon="edit"
			name="onecms-internal-fields"
			title="Internal Metadata"
		>
			<TextControl
				help="Only used internally; does not affect SEO."
				label="Internal Headline"
				onChange={ ( value ) => updateInternalHeadline( value ) }
				value={ internalHeadline }
			/>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'onecms-internal-fields', { render: InternalFieldsSidebar } );
