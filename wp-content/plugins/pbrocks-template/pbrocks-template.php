<?php
/**
 * Plugin Name:       PBrocks Template
 * Description:       A Gutenberg block to show your pride! This block enables you to type text and style it with the color font Gilbert from Type with Pride.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            pbrocks
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pbrocks-template
 *
 * @package           create-block-tutorial
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_tutorial_pbrocks_template_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'create_block_tutorial_pbrocks_template_block_init' );
