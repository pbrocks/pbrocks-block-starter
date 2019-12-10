/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import { ServerSideRender } from '@wordpress/components';

import icon from './icon';

registerBlockType( 'pbrocks-block-starter/amp-info', {
	title: __( 'AMP: Info', 'pbrocks-block-starter' ),
	icon: {
		background: '#29c8aa',
		foreground: '#ffffff',
		src: icon,
	},
	category: 'pbrocks-block-starter',

	edit( props ) {
		return (
			<ServerSideRender
				block="pbrocks-block-starter/amp-info"
				attributes={ props.attributes }
			/>
		);
	},
	save() {
		return null;
	},
} );
