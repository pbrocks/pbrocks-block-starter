/**
 * WordPress dependencies
 */
import {
	PanelBody,
	TextareaControl,
	TextControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { ExtensionSidebar } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import ToutImage from './tout-image';

/**
 * Sidebar for OneCMS Tout-Attribute.
 *
 * @return {Object} The UDF dev tools.
 */
const ToutAttributesSidebar = () => {
	const [ toutHeadline, updateToutHeadline ] = useMeta( 'tout_headline' );
	const [ toutDescription, updateToutDescription ] = useMeta( 'tout_description' );
	const [ toutImageId, updateToutImageId ] = useMeta( 'onecms_tout_image_id' );

	const isToutImageFromUgc = includes( toutImageId, '/' );
	const [ toutImageType, setToutImageType ] = useState( isToutImageFromUgc ? 'ugc-image' : 'image' );

	return (
		<ExtensionSidebar icon="admin-media" name="onecms-tout-attributes"
			title="OneCMS Tout Attributes" >
			<PanelBody initialOpen={ true } >
				<TextControl
					label="Tout headline"
					onChange={ ( value ) => updateToutHeadline( value ) }
					value={ toutHeadline }
				/>

				<TextareaControl
					label="Tout description"
					onChange={ ( value ) => updateToutDescription( value ) }
					value={ toutDescription }
				/>

				<ToutImage
					setToutImageType={ setToutImageType }
					toutImageId={ toutImageId }
					toutImageType={ toutImageType }
					updateToutImageId={ updateToutImageId }
				/>
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-tout-attributes', { render: ToutAttributesSidebar } );
