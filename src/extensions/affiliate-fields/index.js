/**
 * WordPress dependencies
 */
import { PanelBody, SelectControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { Disabled, ExtensionSidebar } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Sidebar for OneCMS/Uuid Fields.
 *
 * @return {Object} The sidebar.
 */
const AffiliateFieldsSidebar = () => {
	const [ disclaimer ] = useMeta( 'content_affiliate_disclaimer' );
	const [
		disclaimerOverride,
		setDisclaimerOverride,
	] = useMeta( 'content_affiliate_disclaimer_override' );

	return (
		<ExtensionSidebar
			icon="cart"
			name="onecms-affiliate-fields"
			title="OneCMS Affiliate Fields"
		>
			<PanelBody initialOpen={ true } >
				<Disabled>
					<SelectControl
						help="Whether or not OneCMS detected affiliate links in the content and will automatically show the affiliate disclaimer text (note: this field only updates after saving changes)."
						label="Affiliate Disclaimer"
						options={ [
							{ label: 'No', value: false },
							{ label: 'Yes', value: true },
						] }
						value={ disclaimer }
					/>
				</Disabled>

				<SelectControl
					help="Select an override option for the affiliate disclaimer. If you choose 'Automatic', OneCMS will try to detect affiliate links and display the disclaimer accordingly."
					label="Affiliate Disclaimer Override"
					onChange={ ( value ) => setDisclaimerOverride( value ) }
					options={ [
						{ label: 'Automatic', value: 'default' },
						{ label: 'Display', value: 'display' },
						{ label: 'Do Not Display', value: 'do-not-display' },
					] }
					value={ disclaimerOverride }
				/>
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-affiliate-fields', { render: AffiliateFieldsSidebar } );
