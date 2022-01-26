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
	register_block_type( __DIR__ . '/src/blocks/block-intro' );
	register_block_type( __DIR__ . '/src/blocks/block-outro' );
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
add_action( 'plugins_loaded', 'load_pbrocks_block_starter_init' );
/**
 * load_pbrocks_block_starter_init
 *
 * Acticvate php files found in folders
 *
 * @return null
 */
function load_pbrocks_block_starter_init() {
	if ( file_exists( __DIR__ . '/inc' ) && is_dir( __DIR__ . '/inc' ) ) {
		foreach ( glob( __DIR__ . '/inc/*.php' ) as $filename ) {
			include $filename;
		}
	}
	if ( file_exists( __DIR__ . '/inc/classes' ) && is_dir( __DIR__ . '/inc/classes' ) ) {
		foreach ( glob( __DIR__ . '/inc/classes/*.php' ) as $filename ) {
			include $filename;
		}
	}
}


/**
 * Setup WordPress localization support
 *
 * @since 1.0
 */
function pbrocks_block_starter_load_textdomain() {
	load_plugin_textdomain( 'pbrocks-block-starter', false, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'pbrocks_block_starter_load_textdomain' );


/**
 * [pbrocks_block_starter_editor_assets] Setup blocks on frontend and editor.
 *
 * @return [type] [description]
 */
function pbrocks_block_starter_editor_assets() {
	$url = untrailingslashit( plugin_dir_url( __FILE__ ) );

	// Scripts.
	wp_enqueue_script(
		'pbrocks-block-starter-js',
		$url . '/build/old-index.js',
		[
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-plugins',
			'wp-edit-post',
		]
	);
	// Styles.
	wp_enqueue_style(
		'pbrocks-block-starter-editor-css',
		$url . '/build/old-editor.css',
		[ 'wp-edit-blocks' ]
	);
}

// add_action( 'enqueue_block_editor_assets', 'pbrocks_block_starter_editor_assets' );
/**
 * [pbrocks_block_starter_assets] Hook assets into the editor.
 *
 * @return [type] [description]
 */
function pbrocks_block_starter_assets() {
	$url = untrailingslashit( plugin_dir_url( __FILE__ ) );

	wp_enqueue_style(
		'pbrocks-block-starter-frontend-css',
		$url . '/build/old-style.css'
	);
}

// add_action( 'enqueue_block_assets', 'pbrocks_block_starter_assets' );
