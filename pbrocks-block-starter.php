<?php
/**
 * Plugin Name:     PBrocks Block Starter
 * Plugin URI:      https://github.com/pbrocks/pbrocks-block-starter
 * Description:     Custom blocks for WordPress.
 * Author:          pbrocks
 * Author URI:      https://github.com/pbrocks
 * Text Domain:     pbrocks-block-starter
 * Domain Path:     /languages
 * Version:         0.2.1
 *
 * @package pbrocks_block_starter
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', 'pharmacy_lookup_blocks_init' );
/**
 * Register blocks using the metadata loaded from the
 * `block.json` file. Behind the scenes, it also
 * registers all assets so they can be enqueued through
 * the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function pharmacy_lookup_blocks_init() {
	register_block_type( __DIR__ . '/src/block-intro' );
	register_block_type( __DIR__ . '/src/block-outro' );
}

/**
 * Adding a block category creates a Panel
 */
function create_pharmacy_lookup_panel( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'pbrocks-block-starter',
				'title' => __( 'PBrocks Panel', 'pbrocks-block-starter' ),
			),
		)
	);
}
add_filter( 'block_categories_all', 'create_pharmacy_lookup_panel', 10, 2 );
