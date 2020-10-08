/**
 * WordPress dependencies
 */
import {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { ExtensionSidebar } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { useEffect } from '@wordpress/element';

/**
 * Sidebar for OneCMS Syndication.
 *
 * @return {Object} The syndication fields sidebar.
 */
const SyndicationFieldsSidebar = () => {
	const [ contentSyndicated, updateContentSyndicated ] = useMeta( 'content_syndicated' );
	const [ contentRights, updateContentRights ] = useMeta( 'content_rights' );
	const [ contentRightNotes, updateContentRightNotes ] = useMeta( 'content_right_notes' );
	const [ syndicatedEntity ] = useMeta( 'syndicated_entity' );
	const [ isSponsored ] = useMeta( 'is_sponsored' );

	useEffect( () => {
		if ( ! isSponsored ) {
			return;
		}

		updateContentSyndicated( 'do-not-syndicate' );
		updateContentRights( 'limited' );
	}, [ isSponsored ] );

	return (
		<ExtensionSidebar
			icon="networking"
			name="onecms-syndication-fields"
			title="OneCMS Syndication Fields"
		>
			<PanelBody initialOpen={ true }>
				<SelectControl
					disabled={ isSponsored }
					label="Content Distribution"
					onChange={ ( value ) => updateContentSyndicated( value ) }
					options={ [
						{ label: 'All Uses', value: 'all' },
						{ label: 'Brand Exclusive', value: 'brand-exclusive' },
						{ label: 'Branded', value: 'branded' },
						{ label: 'Do Not Syndicate', value: 'do-not-syndicate' },
						{ label: 'External Only', value: 'external-only' },
						{ label: 'Native', value: 'native' },
						{ label: 'None', value: 'none' },
						{ label: 'Unknown', value: 'unknown' },
					] }
					value={ contentSyndicated }
				/>
				<SelectControl
					disabled={ isSponsored }
					label="Content Rights"
					onChange={ ( value ) => updateContentRights( value ) }
					options={ [
						{ label: 'Unknown', value: 'unknown' },
						{ label: 'Full Rights', value: 'full' },
						{ label: 'Limited to the Brand', value: 'limited' },
						{ label: 'Restricted Rights - Needs Research', value: 'restricted' },
					] }
					value={ contentRights }
				/>
				<TextareaControl
					label="Rights Notes"
					onChange={ ( value ) => updateContentRightNotes( value ) }
					value={ contentRightNotes }
				/>
				<TextControl
					disabled
					label="Syndicated Entity"
					value={ syndicatedEntity }
				/>
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-syndication-fields', { render: SyndicationFieldsSidebar } );
