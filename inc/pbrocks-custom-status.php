<?php
function pbrocks_custom_status_creation() {
	register_post_status(
		'pheatured',
		[
			'label'                     => _x( 'Pheatured', 'post' ),
			'label_count'               => _n_noop( 'Pheatured <span class="count">(%s)</span>', 'Pheatured <span class="count">(%s)</span>' ),
			'public'                    => true,
		]
	);
}
add_action( 'init', 'pbrocks_custom_status_creation' );
/**
 *
 */
add_action( 'admin_footer-edit.php', 'pbrocks_status_into_inline_edit' );

function pbrocks_status_into_inline_edit() {
	echo "<script>
	jQuery(document).ready( function() {
		jQuery( 'select[name=\"_status\"]' ).append( '<option value=\"pheatured\">Pheatured</option>' );
	});
	</script>";
}

function pbrocks_display_status_label( $statuses ) {
	global $post; // we need it to check current post status
	if ( get_query_var( 'post_status' ) !== 'pheatured' ) {
		if ( $post->post_status === 'pheatured' ) {
			return [ 'Pheatured' ];
		}
	}
	return $statuses;
}

add_filter( 'display_post_states', 'pbrocks_display_status_label' );
