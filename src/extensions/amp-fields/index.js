/**
 * WordPress dependencies
 */
import {
	SelectControl,
} from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

/**
 * External dependencies
 */
import { IfPostTypeSupports, IfBrandSupports } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Sidebar for OneCMS Amp-Fields.
 *
 * @return {Object} The UDF dev tools.
 */
const AmpFieldsSidebar = () => {
	const [ ampStatus, updateAmpStatus ] = useMeta( 'amp_status' );

	return (
		<IfBrandSupports features={ [ 'onecms-amp-override-fields' ] }>
			<IfPostTypeSupports features={ [ 'onecms-amp' ] }>
				<PluginDocumentSettingPanel name="onecms-amp-fields" title="AMP Settings">
					<SelectControl
						help="Enable or disable AMP for a specific piece of content."
						label="AMP Setting"
						onChange={ ( value ) => updateAmpStatus( value ) }
						options={ [
							{ label: 'Enabled', value: true },
							{ label: 'Disabled', value: false },
						] }
						value={ ampStatus }
					/>
				</PluginDocumentSettingPanel>
			</IfPostTypeSupports>
		</IfBrandSupports>
	);
};

registerPlugin( 'onecms-amp-fields', { render: AmpFieldsSidebar } );
