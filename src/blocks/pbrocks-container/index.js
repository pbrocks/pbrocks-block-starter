/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( 'pbrocks-block-starter/container', {
	title: __( 'Starter Container', 'pbrocks-block-starter' ),

	description: __( 'Provide custom container.' ),

	keywords: [ __( 'container' ), __( 'wrapper' ), __( 'section' ) ],

	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
		html: false,
	},

	category: 'pbrocks-block-starter',

	icon: {
		background: '#29c8aa',
		foreground: '#ffffff',
		src: 'editor-kitchensink',
	},

	attributes: {
		content: {
			type: 'string',
		},
	},

	edit: ( props ) => {
		const { className } = props;

		return (
			<div className={ className }>
				<InnerBlocks renderAppender={ InnerBlocks.ButtonBlockAppender } />
			</div>
		);
	},

	save: ( props ) => {
		const { className } = props;

		return (
			<div className={ className }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
