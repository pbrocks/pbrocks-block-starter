<?php
/**
 *
 */

add_action( 'admin_notices', 'amp_check_for_plugin_admin_notice' );
/**
 * Print admin notice if AMP plugin is not installed and activated.
 *
 * @since 1.0
 */
function amp_check_for_plugin_admin_notice() {
	if ( ! defined( 'AMP__FILE__' ) ) {
		$plugin_to_check_for = 'AMP';
		?>
	<div class="notice notice-warning">
		<p>
			<?php
			echo wp_kses_post(
				sprintf(
					__( 'For the <code>%1$s</code> plugin to run, the <code>%2$s</code> plugin also needs to be installed and activated.', 'pbrocks-block-starter' ),
					'pbrocks-block-starter',
					$plugin_to_check_for
				)
			);
			?>
		</p>
	</div>
		<?php
	}
}
