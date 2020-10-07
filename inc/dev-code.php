<?php
add_filter( 'the_content', 'filter_the_content_in_the_main_loop', 1 );
function filter_the_content_in_the_main_loop( $content ) {
	$post_id = get_the_ID();
	$added_content = 'Filtering content inside main loop for post ' . $post_id . ' ' . get_post_status();
	return $content . esc_html__( $added_content, 'pbrocks-block-starter' );

}

add_action( 'save_post_swearby_story', 'pbrocks_on_save_swearby_story' );
/**
 * [pbrocks_on_save_swearby_story description]
 *
 * do_action( "save_post_{$post->post_type}", int $post_ID, WP_Post $post, bool $update )
 *
 * @param  int     $post_ID [description]
 * @param  WP_Post $post    [description]
 * @param  bool    $update  [description]
 * @return [type]           [description]
 */
function pbrocks_on_save_swearby_story( int $post_ID, WP_Post $post, bool $update ) {
	if ( wp_is_post_revision( $post_id ) ) {
		return;
	}
	// wp_register_scripts( 'pb-save-post', plugins_url( 'images/wordpress.png', __DIR__ ), [], time(), true );
}

// Enable Gutenberg for WP < 5.0 beta
add_filter( 'gutenberg_can_edit_post', 'pbrocks_enable_gutenberg_post_ids', 10, 2 );

// Enable Gutenberg for WordPress >= 5.0
add_filter( 'use_block_editor_for_post', 'pbrocks_enable_gutenberg_post_ids', 10, 2 );
/**
 * [pbrocks_enable_gutenberg_post_ids description]
 *
 * @param  [type] $can_edit [description]
 * @param  [type] $post     [description]
 * @return [type]           [description]
 */
function pbrocks_enable_gutenberg_post_ids( $can_edit, $post ) {
	if ( empty( $post->ID ) ) {
		return $can_edit;
	}
	if ( 1 === $post->ID ) {
		return true;
	}
	return $can_edit;
}

add_filter( 'render_block', 'pbrocks_block_starter_show_block_type', 10, 2 );
/**
 * [pbrocks_block_starter_show_block_type description]
 *
 * @param  [type] $block_content [description]
 * @param  [type] $block         [description]
 * @return [type]                [description]
 */
function pbrocks_block_starter_show_block_type( $block_content, $block ) {
	if ( 'pbrocks-block-starter/swiper' === $block['blockName'] ) {
		wp_enqueue_script( 'move-slider-bar' );
	}
	if ( true === WP_DEBUG ) {
		$block_content = "<div class='wp-block' data-blockType='{$block['blockName']}'>{$block_content}<h5 style=\"color:salmon\">{$block['blockName']}</h5></div>";
	}
	return $block_content;
}

add_action( 'admin_head', 'check_for_amp_plugin' );
/**
 * [check_for_amp_plugin description]
 *
 * @return [type] [description]
 */
function check_for_amp_plugin() {
	if ( ! defined( 'AMP__FILE__' ) ) {
		$message = ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) );
	} else {
		$message = 'AMP installed';
	}
	echo '<h3 style="color:salmon;position: absolute;top:2rem;left:50%;">' . $message . '</h3>';
}
