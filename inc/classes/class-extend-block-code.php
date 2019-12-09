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
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Hook into WP.
	 *
	 * @return void
	 */
	public function init() {
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
			'xwp-block-extend-js',
			$this->plugin->asset_url( 'js/dist/editor.js' ),
			[
				'lodash',
				'react',
				'wp-block-editor',
			],
			$this->plugin->asset_version()
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

		$valid = $this->get_number_of_valid_urls();

		$num_terms = $this->get_number_of_errors();

		register_block_type(
			'block-extend/amp-info',
			array(
				'attributes'      =>
				array(
					'valid_amp_urls' => array(
						'type'    => 'string',
						'default' => $valid,
					),
					'amp_url_errors' => array(
						'type'    => 'string',
						'default' => $num_terms,
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
		$return  = '<h4>Validated AMP URLs ' . ( print_r( $attributes['valid_amp_urls'], true ) ?: 'valid_amp_urls not defined' ) . '</h4>';
		$return .= '<h4 style="color:salmon;">AMP URL Errors ' . print_r( $attributes['amp_url_errors'], true ) . '</h4>';
		return $return;
	}

}
