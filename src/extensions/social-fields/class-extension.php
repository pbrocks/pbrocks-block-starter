<?php
/**
 * Register OneCMS Social Fields extension
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Social_Fields;

use OneCMS\Block_Framework\Extensions\Extension_Interface;
use \WP_Post;

/**
 * Class Block
 */
class Extension implements Extension_Interface {

	/**
	 * Metaboxes which this extension replaces.
	 *
	 * @var array
	 */
	public $replaces = [
		'social_box',
	];

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'social-fields';
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
			'social_title' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'social_description' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'poll_result_social_title' => [
				'object_type'    => 'post',
				'object_subtype' => 'poll-page',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'string',
			],
			'poll_result_social_description' => [
				'object_type'    => 'post',
				'object_subtype' => 'poll-page',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'string',
			],
			'social_image_id' => [
				'object_type'  => 'post',
				'show_in_rest' => [
					'prepare_callback' => function ( $value ) : string {
						return ! empty( $value ) ? $value : '';
					},
				],
				'single'       => true,
				'type'         => 'string',
			],
			'social_image_autocrop' => [
				'object_type'       => 'post',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'boolean',
				'sanitize_callback' => function ( $value ) {
					// @see https://core.trac.wordpress.org/ticket/48363
					return $value ? '1' : '0';
				},
				'default'           => false,
			],
			'pinterest_image_id' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'integer',
			],
			'pinterest_image_autocrop' => [
				'object_type'       => 'post',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'boolean',
				'sanitize_callback' => function ( $value ) {
					// @see https://core.trac.wordpress.org/ticket/48363
					return $value ? '1' : '0';
				},
				'default'           => false,
			],
			'pinterest_description' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'facebook_post_copy' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'twitter_title' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
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
		$post_id               = $post->ID;
		$onecms_brand_supports = apply_filters( 'onecms_brand_supports', [] );
		$filter_to_use         = in_array( 'image-reference', $onecms_brand_supports, true ) ? 'udf_image_reference_component' : 'udf_image_component';
		$dek                   = get_post_meta( $post_id, 'dek', true );

		if ( ! empty( $meta['social_title'] ) ) {
			$udf['meta']['social']['title'] = apply_filters( 'unified_filter_html', $meta['social_title'], 'String' );
		}

		if ( ! empty( $meta['social_description'] ) ) {
			$udf['meta']['social']['description'] = apply_filters( 'unified_filter_html', $meta['social_description'], 'String' );
		}

		if ( ! empty( $meta['social_image_id'] ) ) {
			if ( false !== strpos( $meta['social_image_id'], '/' ) ) {
				$filter_to_use = 'udf_image_reference_component';
			}

			$udf['meta']['social']['image'] = apply_filters( $filter_to_use, $post_id, $meta['social_image_id'], [ 'image_type' => 'social' ] );
		}

		if ( ! empty( $meta['pinterest_image_id'] ) ) {
			$pinterest_image_component = apply_filters( $filter_to_use, $post_id, $meta['pinterest_image_id'], [ 'image_type' => 'pinterest_media' ] );

			if ( ! empty( $pinterest_image_component ) ) {
				$udf['meta']['pinterest_media'] = $pinterest_image_component;
			}
		}

		if ( ! empty( $meta['pinterest_description'] ) ) {
			$udf['meta']['pinterest_description'] = apply_filters( 'unified_filter_html', $meta['pinterest_description'], 'String' );
		}

		if ( ! empty( $meta['facebook_post_copy'] ) ) {
			$udf['meta']['facebook_description'] = apply_filters( 'unified_filter_html', $meta['facebook_post_copy'], 'String' );
			$udf['meta']['og_description']       = apply_filters( 'unified_filter_html', $meta['facebook_post_copy'], 'String' );
		}

		if ( empty( $meta['facebook_post_copy'] ) && ! empty( $dek ) ) {
			$udf['meta']['og_description'] = apply_filters( 'unified_filter_html', $dek, 'String' );
		}

		if ( ! empty( $meta['twitter_title'] ) ) {
			$udf['meta']['twitter_title'] = apply_filters( 'unified_filter_html', $meta['twitter_title'], 'String' );
		}

		return $udf;
	}

}
