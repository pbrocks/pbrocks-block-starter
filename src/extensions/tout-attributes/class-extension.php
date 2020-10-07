<?php
/**
 * Register OneCMS Tout Attributes exteension
 *
 * @package WordPress
 * @subpackage Onecms_homepage
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Tout_Attributes;

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
		'tout_attributes',
		'toutimagediv',
	];

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'tout-attributes';
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
			'tout_headline'        => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'tout_description'     => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'onecms_tout_image_id' => [
				'object_type'  => 'post',
				'show_in_rest' => [
					'prepare_callback' => function ( $value ) : string {
						return ! empty( $value ) ? $value : '';
					},
				],
				'single'       => true,
				'type'         => 'string',
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
		if ( ! empty( $meta['tout_headline'] ) ) {
			$udf['tout_headline'] = apply_filters( 'unified_filter_html', $meta['tout_headline'], 'InlineHtml' );
		}

		if ( ! empty( $meta['tout_description'] ) ) {
			$udf['tout_summary'] = apply_filters( 'unified_filter_html', $meta['tout_description'], 'InlineHtml' );
		}

		if ( ! empty( $meta['onecms_tout_image_id'] ) ) {
			$tout_image        = apply_filters( 'udf_image_reference_component', $post->ID, $meta['onecms_tout_image_id'] );
			$udf['tout_image'] = apply_filters( 'unified_filter_html', $tout_image, 'Component' );
		}

		return $udf;
	}

}
