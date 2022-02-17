<?php
/**
 * Recipe Card info.
 */

add_filter( 'render_block', 'pbrocks_block_starter_recipe_card', 10, 2 );
/**
 * [pbrocks_block_starter_recipe_card]
 *
 * @param  array $block_content Block content.
 * @param  array $block         Block info.
 * @return array                Block content.
 */
function pbrocks_block_starter_recipe_card( $block_content, $block ) {
	if ( 'pbrocks-block-starter/recipe-card' === $block['blockName'] ) {
		$block_content = "<div style='border:2px solid blue;height:44vh;' class='wp-block' data-blockType='{$block['blockName']}'>{$block_content}<h5 style=\"color:blue\">{$block['blockName']}</h5></div>";
	}
	return $block_content;
}
