<?php

/**
 * Register Custom Post Type
 *
 * @return [type] [description]
 */
function block_articles_post_type() {

	$labels = [
		'name'                  => _x( 'Block Articles', 'Post Type General Name', 'pbrocks-block-starter' ),
		'singular_name'         => _x( 'Block Article', 'Post Type Singular Name', 'pbrocks-block-starter' ),
		'menu_name'             => __( 'Block Articles', 'pbrocks-block-starter' ),
		'name_admin_bar'        => __( 'Block Article', 'pbrocks-block-starter' ),
		'archives'              => __( 'Block Article Archives', 'pbrocks-block-starter' ),
		'attributes'            => __( 'Block Article Attributes', 'pbrocks-block-starter' ),
		'parent_item_colon'     => __( 'Parent Block Article:', 'pbrocks-block-starter' ),
		'all_items'             => __( 'All Block Articles', 'pbrocks-block-starter' ),
		'add_new_item'          => __( 'Add New Block Article', 'pbrocks-block-starter' ),
		'add_new'               => __( 'Add New Block Article', 'pbrocks-block-starter' ),
		'new_item'              => __( 'New Block Article', 'pbrocks-block-starter' ),
		'edit_item'             => __( 'Edit Block Article', 'pbrocks-block-starter' ),
		'update_item'           => __( 'Update Block Article', 'pbrocks-block-starter' ),
		'view_item'             => __( 'View Block Article', 'pbrocks-block-starter' ),
		'view_items'            => __( 'View Block Articles', 'pbrocks-block-starter' ),
		'search_items'          => __( 'Search Block Article', 'pbrocks-block-starter' ),
		'not_found'             => __( 'Block Article Not found', 'pbrocks-block-starter' ),
		'not_found_in_trash'    => __( 'Block Article Not found in Trash', 'pbrocks-block-starter' ),
		'featured_image'        => __( 'Block Article Featured Image', 'pbrocks-block-starter' ),
		'set_featured_image'    => __( 'Set block article featured image', 'pbrocks-block-starter' ),
		'remove_featured_image' => __( 'Remove block article featured image', 'pbrocks-block-starter' ),
		'use_featured_image'    => __( 'Use as block article featured image', 'pbrocks-block-starter' ),
		'insert_into_item'      => __( 'Insert into block article', 'pbrocks-block-starter' ),
		'uploaded_to_this_item' => __( 'Uploaded to this block article', 'pbrocks-block-starter' ),
		'items_list'            => __( 'Block Articles list', 'pbrocks-block-starter' ),
		'items_list_navigation' => __( 'Block Articles list navigation', 'pbrocks-block-starter' ),
		'filter_items_list'     => __( 'Filter block articles list', 'pbrocks-block-starter' ),
	];
	$args = [
		'label'                 => __( 'Block Article', 'pbrocks-block-starter' ),
		'description'           => __( 'Block articles.', 'pbrocks-block-starter' ),
		'labels'                => $labels,
		'supports'              => [ 'title', 'editor', 'thumbnail', 'comments', 'revisions' ],
		'taxonomies'            => [ 'category', 'post_tag' ],
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
	];
	register_post_type( 'block_articles', $args );

}
add_action( 'init', 'block_articles_post_type', 0 );
