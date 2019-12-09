<?php
/**
 * Plugin Name: Sidetrack Dashboard Menu
 */
/**
 * Add a page to the dashboard menu.
 *
 * @since 1.0.0
 *
 * @return array
 */
add_action( 'admin_menu', 'pbrocks_dashboard' );
function pbrocks_dashboard() {
	$slug  = preg_replace( '/_+/', '-', __FUNCTION__ );
	$label = ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) );
	add_dashboard_page( __( $label, 'pbrocks-block-starter' ), __( $label, 'pbrocks-block-starter' ), 'manage_options', $slug . '.php', 'pbrocks_dashboard_page' );
}


/**
 * Debug Information
 *
 * @since 1.0.0
 *
 * @param bool $html Optional. Return as HTML or not
 *
 * @return string
 */
function pbrocks_dashboard_page() {
	global $wpdb;
	echo '<div class="wrap">';
	echo '<h2>' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . '</h2>';
	$screen         = get_current_screen();
	$site_theme     = wp_get_theme();
	$site_prefix    = $wpdb->prefix;
	$prefix_message = '$site_prefix = ' . $site_prefix;
	$plugin_stuff = get_plugin_data( dirname( __FILE__ ) );
	if ( is_multisite() ) {
		$network_prefix  = $wpdb->base_prefix;
		$prefix_message .= '<br>$network_prefix = ' . $network_prefix;
		$blog_id = get_current_blog_id();
		$prefix_message .= '<br>$site_prefix = ' . $network_prefix . $blog_id . '_';
	}

	echo '<div class="add-to-pbrocks-dash" style="background:aliceblue;padding:1rem 2rem;">';
	do_action( 'add_to_pbrocks_dash' );
	echo '</div>';

	echo '<h4 style="color:rgba(250,128,114,.7);">' . $plugin_stuff->name . '<br>Current Screen is <span style="color:rgba(250,128,114,1);">' . $screen->id . '</span></h4>';

	echo 'Your WordPress version is ' . get_bloginfo( 'version' ) . '<br>';
	echo 'DB prefix is ' . $site_prefix . '<br>';
	echo 'PHP version is ' . phpversion() . '<br>';

	$site_theme = wp_get_theme();
	echo '<h4>Theme is ' . sprintf(
		__( '%1$s and is version %2$s', 'text-domain' ),
		$site_theme->get( 'Name' ),
		$site_theme->get( 'Version' )
	) . '</h4>';
	echo '<h4>Templates found in ' . get_template_directory() . '</h4>';
	echo '<h4>Stylesheet found in ' . get_stylesheet_directory() . '</h4>';
	echo '</div>';
}

add_action( 'add_to_pbrocks_dash', 'adding_to_pbrocks_dashboard_page' );

/**
 * Debug Information
 *
 * @since 1.0.0
 *
 * @param bool $html Optional. Return as HTML or not
 *
 * @return string
 */
function adding_to_pbrocks_dashboard_page() {
	echo '<h2>' . __( ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ), 'pbrocks-block-starter' ) . '</h2>';
	echo '<h3>' . __( 'Add more info here', 'pbrocks-block-starter' ) . '</h3>';
}
add_action( 'add_to_pbrocks_dash', 'request_something_to_pbrocks' );
function request_something_to_pbrocks() {
	if ( isset( $_REQUEST['action'] ) && 'show_info' === $_REQUEST['action'] ) {
		echo 'pinged import file<br>';
	} else {
		echo 'import file does not exist<br>';
	}
}

add_action( 'add_to_pbrocks_dash', 'search_something_for_pbrocks' );
function search_something_for_pbrocks() {
	$current_url = home_url( add_query_arg( null, null ) );
	echo '<h4>$current_url = ' . $current_url . '</h4>';
	$add_query_arg = esc_url( add_query_arg( 'foo', 'bar' ) );
	echo '<h4>$add_query_arg = ' . $add_query_arg . '</h4>';

	echo '<br>We should have a button <a href="' . esc_url( add_query_arg( 'action', 'show_info' ) ) . '"><button>Click to add query arguments</button></a><br>';

}

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
