<?php
/**
 * Plugin Name:     PBrocks Block Starter
 * Plugin URI:      https://github.com/pbrocks/pbrocks-block-starter
 * Description:     Custom blocks for WordPress.
 * Author:          pbrocks
 * Author URI:      https://github.com/pbrocks
 * Text Domain:     pbrocks-block-starter
 * Domain Path:     /languages
 * Version:         0.1.1
 *
 * @package pbrocks_block_starter
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

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
		$url . '/build/index.js',
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-plugins',
			'wp-edit-post',
		)
	);
	// Styles.
	wp_enqueue_style(
		'pbrocks-block-starter-editor-css',
		$url . '/build/editor.css',
		array( 'wp-edit-blocks' )
	);
}

add_action( 'enqueue_block_editor_assets', 'pbrocks_block_starter_editor_assets' );
/**
 * [pbrocks_block_starter_assets] Hook assets into the editor.
 *
 * @return [type] [description]
 */
function pbrocks_block_starter_assets() {
	$url = untrailingslashit( plugin_dir_url( __FILE__ ) );

	wp_enqueue_style(
		'pbrocks-block-starter-frontend-css',
		$url . '/build/style.css'
	);
}

add_action( 'enqueue_block_assets', 'pbrocks_block_starter_assets' );

/**
 * Adding a block category creates a Panel
 */
function create_pbrocks_block_starter_panel( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'pbrocks-block-starter',
				'title' => __( 'PBrocks Starter Blocks Panel', 'pbrocks-block-starter' ),
			),
		)
	);
}
add_filter( 'block_categories', 'create_pbrocks_block_starter_panel', 10, 2 );
