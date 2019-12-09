<?php

add_filter( 'render_block', 'pbrocks_block_starter_show_block_type', 10, 2 );
function pbrocks_block_starter_show_block_type( $block_content, $block ) {
	if ( 'pbrocks-block-starter/swiper' === $block['blockName'] ) {
		wp_enqueue_script( 'move-slider-bar' );
	}
	if ( true === WP_DEBUG ) {
		$block_content = "<div class='wp-block' data-blockType='{$block['blockName']}'>{$block_content}<h5 style=\"color:salmon\">{$block['blockName']}</h5></div>";
	}
	return $block_content;
}
