<?php
/**
 * Register OneCMS Amp Fields exteension
 *
 * @package WordPress
 * @subpackage Onecms_homepage
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Amp_Fields;

use OneCMS\Block_Framework\Extensions\Extension_Interface;
use \WP_Post;

/**
 * Class Block
 */
class Extension implements Extension_Interface {

	/**
	 * Metaboxes this extension replaces.
	 *
	 * @var array
	 */
	public $replaces = [
		'amp_settings',
	];

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'amp-fields';
	}

	/**
	 * Register the block assets.
	 *
	 * @return array
	 */
	public function assets() : array {
		return [
			'editor_script' => 'onecms-block-editor',
		];
	}

	/**
	 * Register the metadata.
	 *
	 * @return array
	 */
	public function meta() : array {
		return [
			'amp_status' => [
				'object_type'       => 'post',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'boolean',
				'default_callback'  => function () : bool {
					if ( true === apply_filters( 'onecms_brand_support_amp_rendering', false ) ) {
						return true;
					}
					return false;
				},
				'sanitize_callback' => function ( $value ) {
					// @see https://core.trac.wordpress.org/ticket/48363
					return $value ? '1' : '0';
				},
			],
		];
	}

	/**
	 * Add metadata to UDF for the given post.
	 *
	 * @param array         $udf  The UDF to filter.
	 * @param array         $meta An array of meta for the content.
	 * @param \WP_Post|null $post The post which is the source of the UDF data.
	 *
	 * @return array|null The rendered UDF.
	 */
	public function udf( array $udf, array $meta, ?WP_Post $post ) : ?array {
		return null;
	}

}
