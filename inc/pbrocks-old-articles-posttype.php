<?php
/**
 * Register Custom Post Type
 *
 * @return [type] [description]
 */
function old_articles_post_type() {

	$labels = [
		'name'                  => _x( 'Old Articles', 'Post Type General Name', 'pbrocks-block-starter' ),
		'singular_name'         => _x( 'Old Article', 'Post Type Singular Name', 'pbrocks-block-starter' ),
		'menu_name'             => __( 'Old Articles', 'pbrocks-block-starter' ),
		'name_admin_bar'        => __( 'Old Article', 'pbrocks-block-starter' ),
		'archives'              => __( 'Old Article Archives', 'pbrocks-block-starter' ),
		'attributes'            => __( 'Old Article Attributes', 'pbrocks-block-starter' ),
		'parent_item_colon'     => __( 'Parent Old Article:', 'pbrocks-block-starter' ),
		'all_items'             => __( 'All Old Articles', 'pbrocks-block-starter' ),
		'add_new_item'          => __( 'Add Another Old Article', 'pbrocks-block-starter' ),
		'add_new'               => __( 'Add Another', 'pbrocks-block-starter' ),
		'new_item'              => __( 'Another Old Article', 'pbrocks-block-starter' ),
		'edit_item'             => __( 'Edit Old Article', 'pbrocks-block-starter' ),
		'update_item'           => __( 'Update Old Article', 'pbrocks-block-starter' ),
		'view_item'             => __( 'View Old Article', 'pbrocks-block-starter' ),
		'view_items'            => __( 'View Old Articles', 'pbrocks-block-starter' ),
		'search_items'          => __( 'Search Old Article', 'pbrocks-block-starter' ),
		'not_found'             => __( 'Old Article Not found', 'pbrocks-block-starter' ),
		'not_found_in_trash'    => __( 'Old Article Not found in Trash', 'pbrocks-block-starter' ),
		'featured_image'        => __( 'Old Article Featured Image', 'pbrocks-block-starter' ),
		'set_featured_image'    => __( 'Set Old Article featured image', 'pbrocks-block-starter' ),
		'remove_featured_image' => __( 'Remove Old Article featured image', 'pbrocks-block-starter' ),
		'use_featured_image'    => __( 'Use as Old Article featured image', 'pbrocks-block-starter' ),
		'insert_into_item'      => __( 'Insert into old article', 'pbrocks-block-starter' ),
		'uploaded_to_this_item' => __( 'Uploaded to this old article', 'pbrocks-block-starter' ),
		'items_list'            => __( 'Old Articles list', 'pbrocks-block-starter' ),
		'items_list_navigation' => __( 'Old Articles list navigation', 'pbrocks-block-starter' ),
		'filter_items_list'     => __( 'Filter old articles list', 'pbrocks-block-starter' ),
	];
	$args = [
		'label'                 => __( 'Old Article', 'pbrocks-block-starter' ),
		'description'           => __( 'Old articles.', 'pbrocks-block-starter' ),
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
	];
	register_post_type( 'old_articles', $args );

}
add_action( 'init', 'old_articles_post_type', 0 );
