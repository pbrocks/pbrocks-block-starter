<?php
/**
 * Plugin Router.
 */
class Block_Extend_Code {

	/**
	 * Plugin interface.
	 *
	 * @var XWP\BlockExtend\Plugin
	 */
	protected $plugin;

	/**
	 * Setup the plugin instance.
	 *
	 * @param XWP\BlockExtend\Plugin $plugin Instance of the plugin abstraction.
	 */
	// public function __construct( $plugin ) {
	// $this->plugin = $plugin;
	// }

	/**
	 * Hook into WP.
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
		add_action( 'init', [ $this, 'built_with_php_init' ] );
	}

	/**
	 * Load our block assets.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets() {
		wp_enqueue_script(
			'xwp-pbrocks-block-starter-js',
			plugins_url( 'build/editor.js', dirname( __DIR__ ) ),
			// $this->plugin->asset_url( 'js/dist/editor.js' ),
			[
				'lodash',
				'react',
				'wp-block-editor',
			],
			time()
			// $this->plugin->asset_version()
		);
	}

	/**
	 * [get_number_of_valid_urls description]
	 *
	 * @return [type] [description]
	 */
	public function get_number_of_valid_urls() {
		$post_type = 'amp_validated_url';
		$count     = wp_count_posts( $post_type );
		return $count->publish;
	}

	/**
	 * [get_number_of_valid_urls description]
	 *
	 * @return [type] [description]
	 */
	public function get_number_of_errors() {
		$taxonomy = 'amp_validation_error';

		$num_terms = wp_count_terms(
			$taxonomy,
			[]
		);
		return $num_terms;
	}

	/**
	 * [get_number_of_valid_urls description]
	 *
	 * @return [type] [description]
	 */
	public function built_with_php_init() {
		register_block_type(
			'pbrocks-block-starter/amp-info',
			array(
				'attributes'      =>
				array(
					'valid_amp_urls' => array(
						'type'    => 'string',
						'default' => 0,
					),
					'amp_url_errors' => array(
						'type'    => 'string',
						'default' => 0,
					),

				),

				'render_callback' => [ $this, 'render_amp_info_with_php' ],
			)
		);

	}

	/**
	 * [render_amp_info_with_php]
	 *
	 * @return string [description]
	 */
	public function render_amp_info_with_php( $attributes ) {
		$valid = ( $this->get_number_of_valid_urls() ?: __( 'valid_amp_urls not defined', 'pbrocks-block-starter' ) );

		$num_terms                    = ( $this->get_number_of_errors() ?: __( 'amp_url_errors not defined', 'pbrocks-block-starter' ) );
		$attributes['valid_amp_urls'] = $this->get_number_of_valid_urls();
		$attributes['amp_url_errors'] = $this->get_number_of_errors();
		$output                       = esc_html(
			sprintf(
				__( 'Validated AMP URLs %1$s<br> AMP URL Errors %2$s', 'pbrocks-block-starter' ),
				$attributes['valid_amp_urls'],
				$attributes['amp_url_errors']
			)
		);
		return $output;
	}
}
new Block_Extend_Code();
