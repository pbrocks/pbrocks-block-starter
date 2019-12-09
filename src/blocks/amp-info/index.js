
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { ServerSideRender,
} = wp.components;

import icon from './icon'; 

registerBlockType( 'pbrocks-block-starter/amp-info', {
	title: __( 'AMP: Info', 'pbrocks-block-starter' ),
	icon: {
		background: '#29c8aa',
		foreground: '#ffffff',
		src: icon,
	},
	category: 'common',

	edit: function( props ) {
		return (
			<ServerSideRender
				block="pbrocks-block-starter/amp-info"
				attributes={ props.attributes }
			/>
			);
	},
	save: function() {
		return null;
	},
} );