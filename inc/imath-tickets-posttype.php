<?php
/**
 * Using WP Statuses for custom Post Types.
 *
 * @link http://github.com/imath/wp-statuses
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register the 'ticket' Post Type and the ticket's specific statuses.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_post_type
 */
function example_register() {

	register_post_type(
		'ticket',
		[
			'labels' => [
				'name'                  => _x( 'Tickets', 'post type general name', 'pbrocks-block-starter' ),
				'singular_name'         => _x( 'Ticket', 'post type singular name', 'pbrocks-block-starter' ),
				'menu_name'             => _x( 'Tickets', 'admin menu', 'pbrocks-block-starter' ),
				'name_admin_bar'        => _x( 'Ticket', 'add new on admin bar', 'pbrocks-block-starter' ),
				'add_new'               => _x( 'Add new', 'book', 'pbrocks-block-starter' ),
				'add_new_item'          => __( 'Add a new Ticket', 'pbrocks-block-starter' ),
				'new_item'              => __( 'New Ticket', 'pbrocks-block-starter' ),
				'edit_item'             => __( 'Edit Ticket', 'pbrocks-block-starter' ),
				'view_item'             => __( 'View Ticket', 'pbrocks-block-starter' ),
				'all_items'             => __( 'All Tickets', 'pbrocks-block-starter' ),
				'search_items'          => __( 'Search Tickets', 'pbrocks-block-starter' ),
				'parent_item_colon'     => __( 'Parent Ticket:', 'pbrocks-block-starter' ),
				'not_found'             => __( 'No tickets found', 'pbrocks-block-starter' ),
				'not_found_in_trash'    => __( 'No tickets found in trash', 'pbrocks-block-starter' ),
				'insert_into_item'      => __( 'Insert into ticket', 'pbrocks-block-starter' ),
				'uploaded_to_this_item' => __( 'Uploaded to this ticket', 'pbrocks-block-starter' ),
				'filter_items_list'     => __( 'Filter tickets list', 'pbrocks-block-starter' ),
				'items_list_navigation' => __( 'Tickets list navigation', 'pbrocks-block-starter' ),
				'items_list'            => __( 'Tickets list', 'pbrocks-block-starter' ),
			],
			'description'        => __( 'WP Statuses\' example for a custom Post Type.', 'pbrocks-block-starter' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => [ 'slug' => 'tickets' ],
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
			'menu_icon'          => 'dashicons-tickets',
			'supports'           => [ 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ],
			'delete_with_user'   => true,
			'can_export'         => true,
			'show_in_rest'       => true,
		]
	);

	/** Statuses */

	register_post_status(
		'resolved',
		[
			'label'                     => _x( 'Resolved', 'post status label', 'pbrocks-block-starter' ),
			'public'                    => true,
			'label_count'               => _n_noop( 'Resolved <span class="count">(%s)</span>', 'Resolved <span class="count">(%s)</span>', 'pbrocks-block-starter' ),
			'post_type'                 => [ 'ticket' ], // Define one or more post types the status can be applied to.
			'show_in_admin_all_list'    => true,
			'show_in_admin_status_list' => true,
			'show_in_metabox_dropdown'  => true,
			'show_in_inline_dropdown'   => true,
			'dashicon'                  => 'dashicons-yes',
		]
	);

	register_post_status(
		'invalid',
		[
			'label'                     => _x( 'Invalid', 'post status label', 'pbrocks-block-starter' ),
			'public'                    => true,
			'label_count'               => _n_noop( 'Invalid <span class="count">(%s)</span>', 'Invalids <span class="count">(%s)</span>', 'pbrocks-block-starter' ),
			'post_type'                 => [ 'ticket' ], // Define one or more post types the status can be applied to.
			'show_in_admin_all_list'    => true,
			'show_in_admin_status_list' => true,
			'show_in_metabox_dropdown'  => true,
			'show_in_inline_dropdown'   => true,
			'dashicon'                  => 'dashicons-dismiss',
		]
	);

	register_post_status(
		'assigned',
		[
			'label'                     => _x( 'Assigned', 'post status label', 'pbrocks-block-starter' ),
			'public'                    => true,
			'label_count'               => _n_noop( 'Assigned <span class="count">(%s)</span>', 'Assigned <span class="count">(%s)</span>', 'pbrocks-block-starter' ),
			'post_type'                 => [ 'ticket' ], // Define one or more post types the status can be applied to.
			'show_in_admin_all_list'    => true,
			'show_in_admin_status_list' => true,
			'show_in_metabox_dropdown'  => true,
			'show_in_inline_dropdown'   => true,
			'dashicon'                  => 'dashicons-businessman',
		]
	);
}
add_action( 'init', 'example_register' );

/**
 * Only keep Draft & Pending statuses but do not use other builtin statuses.
 *
 * PS: you should at least keep Draft & Pending.
 *
 * @param  array  $post_types  The list of registered Post Types for the status.
 * @param  string $status_name Name of the status to apply to Post Types.
 * @return array               The list of registered Post Types for the status.
 */
function example_restrict_statuses_for_tickets( $post_types = [], $status_name = '' ) {
	if ( 'draft' === $status_name || 'pending' === $status_name ) {
		return $post_types;
	}

	// All other statuses (eg: Publish, Private...) won't be applied to tickets
	return array_diff( $post_types, [ 'ticket' ] );
}
add_filter( 'wp_statuses_get_registered_post_types', 'example_restrict_statuses_for_tickets', 10, 2 );

/**
 * Makes sure we can directly "Publish" using custom statuses.
 *
 * @param  array $data    A list of arguments to use to insert a new Post Type's item.
 * @param  array $postarr WordPress' version of posted var.
 * @return array           A list of arguments to use to insert a new Post Type's item.
 */
function example_insert_using_custom_status( $data = [], $postarr = [] ) {

	if ( empty( $postarr['publish'] ) ) {
		return $data;
	}

	if ( 'ticket' !== $data['post_type'] ) {
		return $data;
	}

	if ( ! empty( $postarr['_wp_statuses_status'] ) && in_array(
		$postarr['_wp_statuses_status'],
		[
			'resolved',
			'invalid',
			'assigned',
		],
		true
	) ) {
		$data['post_status'] = sanitize_key( $postarr['_wp_statuses_status'] );

		// Default status for the tickets Post Type is assigned.
	} else {
		$data['post_status'] = 'assigned';
	}

	return $data;
}
add_filter( 'wp_insert_post_data', 'example_insert_using_custom_status', 10, 2 );
