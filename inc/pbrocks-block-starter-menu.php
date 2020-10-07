<?php
if ( is_multisite() ) {
	add_action( 'network_admin_menu', 'pbrocks_blocks' );
}
add_action( 'admin_menu', 'pbrocks_blocks' );
function pbrocks_blocks() {
	$slug  = preg_replace( '/_+/', '-', __FUNCTION__ );
	$label = ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) );
	add_menu_page( __( $label, 'pbrocks-blocks' ), __( $label, 'pbrocks-blocks' ), 'manage_options', $slug . '.php', 'pbrocks_blocks_dash', 'dashicons-carrot', 3 );
	add_submenu_page( 'pbrocks-blocks.php', __( $label, 'pbrocks-blocks' ), __( $label, 'pbrocks-blocks' ), 'manage_options', $slug . '-1.php', 'pbrocks_blocks_notes' );
}
add_action( 'add_to_pbrocks_blocks_dash', 'search_something_for_pbrocks_blocks' );
add_action( 'add_to_pbrocks_blocks_dash', 'show_something_for_pbrocks_blocks' );
add_action( 'add_to_pbrocks_blocks', 'pbrocks_blocks_callback', 11 );
add_action( 'add_to_pbrocks_blocks', 'pbrocks_blocks_status', 10 );


/**
 * Debug Information
 *
 * @since 1.0.0
 *
 * @param bool $html Optional. Return as HTML or not
 *
 * @return string
 */
function pbrocks_blocks_dash() {
	global $wpdb;
	echo '<div class="wrap">';
	echo '<h2>' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . '</h2>';

	echo '<div class="add-to-blocks-dash" style="background:aliceblue;padding:1rem 2rem;">';
	do_action( 'add_to_pbrocks_blocks_dash' );
	echo '</div>';

	echo '</div>';
}


/**
 * Register and add settings
 */
function pbrocks_blocks_notes() {
	echo '<div class="wrap">';
	echo '<h2>' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . '</h2>';
	notes_hook();
	echo '</div>';
}


	/**
	 * Add add_action() and add_filter() in this method.
	 */
function notes_hook() {
		echo '<div class="add-to-swearby-dash">';
	do_action( 'add_to_pbrocks_blocks' );
	echo '</div>';
}

	/**
	 * Register and add settings
	 */
function pbrocks_blocks_callback() {
	echo '<div style="border:.31rem solid salmon;padding:.3rem 1rem;">';
	pbrocks_blocks_info();
	echo '</div>';
}
/**
 * Add 'Unread' post status.
 */
function wpdocs_custom_post_status() {
	register_post_status(
		'unread',
		[
			'label'                     => _x( 'Unread', 'post' ),
			'public'                    => true,
			'exclude_from_search'       => false,
			'show_in_admin_all_list'    => true,
			'show_in_admin_status_list' => true,
			'label_count'               => _n_noop( 'Unread <span class="count">(%s)</span>', 'Unread <span class="count">(%s)</span>' ),
		]
	);
}
add_action( 'init', 'wpdocs_custom_post_status' );

function post_status_ref_links() {
	$thing[] = 'https://wordpress.stackexchange.com/questions/67655/register-post-status-and-show-in-admin-all-list/67656';
	$thing[] = 'https://core.trac.wordpress.org/ticket/12706#comment:250';
	return $thing;
}
function pbrocks_blocks_info() {
	echo '<h3>' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . ' <span style="font-size:70%;color:salmon;">' . basename( __FILE__ ) . ' | ' . __LINE__ . '</span></h3>';
	echo '<p class="description">Purpose of this admin page is to display the important Post Types and their respective Taxonomies found in Swearby.</p>';

	$post_statuses = get_post_stati( $args );
	echo 'get_option( efc_groups_active ) = ' . get_option( 'efc_groups_active' );
	echo '<h3 style="color:green;">Current Filter/Action ' . current_filter() . '</h3>';

	if ( isset( $_REQUEST['action'] ) && __FUNCTION__ === $_REQUEST['action'] ) {
		echo '<h4>To hide ' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . ' <a href="' . esc_url( remove_query_arg( 'action' ) ) . '"><button>Click Here</button></a></h4>';
		echo '<pre>show_swearby_products ';

		if ( ! empty( $post_statuses ) ) : ?>
			<ul>
					<?php
					foreach ( $post_statuses as $post_status ) {
						echo '<li>' . $post_status . '</li>';
					}
					?>
			</ul>
				<?php
		endif;
		echo '</pre>';
	} else {
		echo '<h4>To show ' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . ' <a href="' . esc_url( add_query_arg( 'action', __FUNCTION__ ) ) . '"><button>Click Here</button></a></h4>';
	}
}
function pbrocks_blocks_status() {
	echo '<div style="margin:1rem 0;border:.31rem solid salmon;padding:.3rem 1rem;">';
	echo '<p>No Core solution for Custom Post Statuses</p>';
	echo '<pre style="white-space: pre-wrap;">';
	echo print_r( post_status_ref_links(), true );
	echo '</pre>';
	echo __FUNCTION__;
	if ( isset( $_REQUEST['action'] ) && __FUNCTION__ === $_REQUEST['action'] ) {
		echo '<h4>To hide ' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . ' <a href="' . esc_url( remove_query_arg( 'action' ) ) . '"><button>Click Here</button></a></h4>';
		$post_statuses = get_post_stati();
		echo '<pre> $post_statuses ';
		print_r( $post_statuses );
		echo '</pre>';
	} else {
		echo '<h4>To show ' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . ' <a href="' . esc_url( add_query_arg( 'action', __FUNCTION__ ) ) . '"><button>Click Here</button></a></h4>';
	}
	echo '</div>';
}

function show_products_pbrocks_blocks() {
	echo '<h3>' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . ' <span style="font-size:70%;color:salmon;">' . basename( __FILE__ ) . ' | ' . __LINE__ . '</span></h3>';
		echo '<h3>' . ucwords( preg_replace( '/_+/', ' ', __FUNCTION__ ) ) . '</h3>';
		show_products_products_taxos();
		$products = get_products_object( 'products' );

	if ( isset( $_REQUEST['action'] ) && 'show_products' === $_REQUEST['action'] ) {
		echo '<h4>To hide Products Object <a href="' . esc_url( remove_query_arg( 'action' ) ) . '"><button>Click Here</button></a></h4>';
		echo '<pre>$products ';
		print_r( $products );
		echo '</pre>';
	} else {
		echo '<h4>To show Products Object <a href="' . esc_url( add_query_arg( 'action', 'show_products' ) ) . '"><button>Click Here</button></a></h4>';
	}
}

function show_products_products_taxos() {
	$products = get_post_type_object( 'products' );
		echo '<pre>$products ';
		print_r( $products->taxonomies );
		echo '</pre>';
}


function search_something_for_pbrocks_blocks() {
	$current_url = home_url( add_query_arg( null, null ) );
	echo '<h4>$current_url = ' . $current_url . '</h4>';
	$add_query_arg = esc_url( add_query_arg( 'foo', 'bar' ) );
	echo '<h4>$add_query_arg = ' . $add_query_arg . '</h4>';
	if ( isset( $_REQUEST['action'] ) && 'show_debug_info' === $_REQUEST['action'] ) {
		echo '<h4>To hide Debug Info <a href="' . esc_url( remove_query_arg( 'action' ) ) . '"><button>Click Here</button></a></h4>';
		echo '<pre>$js_deferred ';
		print_r( get_defined_constants( true )['user'] );
		// print_r( $js_deferred );
		echo '</pre>';
	} else {
		echo '<h4>To show Debug Info <a href="' . esc_url( add_query_arg( 'action', 'show_debug_info' ) ) . '"><button>Click Here</button></a></h4>';
	}
}

function show_something_for_pbrocks_blocks() {
	  $current_url = home_url( add_query_arg( null, null ) );
	$screen         = get_current_screen();
	$site_theme     = wp_get_theme();
	$site_prefix    = $wpdb->prefix;
	$prefix_message = '$site_prefix = ' . $site_prefix;
	$add_query_arg = esc_url( add_query_arg( 'foo', 'bar' ) );
	echo '<h4>$add_query_arg = ' . $add_query_arg . '</h4>';
	if ( isset( $_REQUEST['action'] ) && __FUNCTION__ === $_REQUEST['action'] ) {
		echo '<h4>To hide Theme Info <a href="' . esc_url( remove_query_arg( 'action' ) ) . '"><button>Click Here</button></a></h4>';

		if ( is_multisite() ) {
			$network_prefix  = $wpdb->base_prefix;
			$prefix_message .= '<br>$network_prefix = ' . $network_prefix;
			$blog_id         = get_current_blog_id();
			$prefix_message .= '<br>$site_prefix = ' . $network_prefix . $blog_id . '_';
		}
		echo '<h4>$current_url = ' . $current_url . '</h4>';
		echo '<h4 style="color:rgba(250,128,114,.7);">Current Screen is <span style="color:rgba(250,128,114,1);">' . $screen->id . '</span></h4>';
		echo 'Your WordPress version is ' . get_bloginfo( 'version' );

		$my_theme = wp_get_theme();
		echo '<h4>' . $prefix_message . '</h4>';
		echo '<h4>Theme is ' . sprintf(
			__( '%1$s and is version %2$s', 'text-domain' ),
			$my_theme->get( 'Name' ),
			$my_theme->get( 'Version' )
		) . '</h4>';
		echo '<h4>Templates found in ' . get_template_directory() . '</h4>';
		echo '<h4>Stylesheet found in ' . get_stylesheet_directory() . '</h4>';
	} else {
		echo '<h4>To show Theme Info <a href="' . esc_url( add_query_arg( 'action', __FUNCTION__ ) ) . '"><button>Click Here</button></a></h4>';
	}
}
