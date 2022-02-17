/**
 * External dependencies
 */
import { PostsIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, Spinner } from '@wordpress/components';
import { lazy, Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
const Edit = lazy( () => import( './edit' ) );
import metadata from './block.json';
import transforms from './transforms';

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	/* translators: block name */
	title: __( 'Posts (CoBlocks)', 'pbrocks-block-starter' ),
	/* translators: block description */
	description: __( 'Display posts or an RSS feed as stacked or horizontal cards.', 'pbrocks-block-starter' ),
	icon: <Icon icon={ icon } />,
	keywords: [
		'coblrocks',
		/* translators: block keyword */
		__( 'posts', 'pbrocks-block-starter' ),
		/* translators: block keyword */
		__( 'blog', 'pbrocks-block-starter' ),
		/* translators: block keyword */
		__( 'latest', 'pbrocks-block-starter' ),
		/* translators: block keyword */
		__( 'rss', 'pbrocks-block-starter' ),
	],
	supports: {
		align: [ 'wide', 'full' ],
		gutter: {
			default: 'medium',
		},
		html: false,
	},
	transforms,
	edit: ( props ) => (
		<Suspense fallback={ <Spinner /> }>
			<Edit { ...props } />
		</Suspense>
	),
	example: {
		attributes: {},
	},
	deprecated,
	save() {
		return null;
	},
};

export { name, category, settings };
