<?php

add_action( 'rest_api_init', 'pbrocks_custom_endpoints' );
/**
 * Create custom endpoints for block settings
 */
function pbrocks_custom_endpoints() {

	register_rest_route(
		PBROCKS_REST_NAMESPACE,
		'block-setting/',
		[
			'methods'  => \WP_REST_Server::READABLE,
			'callback' => 'get_block_setting',
		]
	);

	register_rest_route(
		PBROCKS_REST_NAMESPACE,
		'block-setting/',
		[
			'methods'             => \WP_REST_Server::EDITABLE,
			'callback'            => 'update_block_setting',
			'permission_callback' => 'check_permissions',
		]
	);

}

function get_block_setting() {

	$block_setting = get_option( PBROCKS_BLOCK_SETTING );

	$response = new \WP_REST_Response( $block_setting );
	$response->set_status( 200 );

	return $response;
}

function update_block_setting( $request ) {

	$new_block_setting = $request->get_body();
	update_option( PBROCKS_BLOCK_SETTING, $new_block_setting );

	$block_setting = get_option( PBROCKS_BLOCK_SETTING );
	$response      = new \WP_REST_Response( $block_setting );
	$response->set_status( 201 );

	return $response;

}

function check_permissions() {
	return current_user_can( 'edit_posts' );
}
