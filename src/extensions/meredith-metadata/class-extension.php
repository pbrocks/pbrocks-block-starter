<?php
/**
 * Register OneCMS Meredith Metadata extension
 *
 * @package WordPress
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Meredith_Metadata;

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
		'meredith_metadata_box',
	];

	/**
	 * Extension name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'meredith-metadata';
	}

	/**
	 * Register the extension assets.
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
			'content_lifecycle' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => 'evergreen-annual',
			],
			'editorial_attributes' => [
				'object_type'  => 'post',
				'single'       => false,
				'type'         => 'integer',
				'default'      => [],
				'show_in_rest' => true,
			],
			'facebook_news_opinion' => [
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
			'facebook_news_blacklist' => [
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
			'keywords' => [
				'object_type'  => 'post',
				'single'       => false,
				'type'         => 'integer',
				'default'      => [],
				'show_in_rest' => true,
			],
			'primary_purpose' => [
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
		$primary_purpose = array_key_exists( 'primary_purpose', $meta ) ? $meta['primary_purpose'] : '';
		if ( ! empty( $primary_purpose ) && 'none' !== $primary_purpose ) {
			if ( 'traffic' === $primary_purpose || 'acquisition' === $primary_purpose ) {
				$primary_purpose = 'traffic-and-acquisition';
			}
			$udf['meta']['primary_purpose'] = $primary_purpose;
		}

		$editorial_attributes = array_key_exists( 'editorial_attributes', $meta ) ? $meta['editorial_attributes'] : [];
		if ( ! empty( $editorial_attributes ) ) {
			$editorial_attribute_components = array_map(
				function( $term_id ) {
					if ( empty( $term_id ) ) {
						return null;
					}

					return apply_filters( 'build_term_component', $term_id, 'editorial_attributes' );
				},
				$editorial_attributes
			);

			if ( ! empty( $editorial_attribute_components ) ) {
				$udf['taxonomy']['editorial_attributes'] = array_filter( $editorial_attribute_components );
			}
		}

		$keywords = array_key_exists( 'keywords', $meta ) ? $meta['keywords'] : [];
		if ( ! empty( $keywords ) ) {
			$keywords_component = array_map(
				function( $term_id ) {
					if ( empty( $term_id ) ) {
						return null;
					}

					return apply_filters( 'build_term_component', $term_id, 'keyword' );
				},
				$keywords
			);

			if ( ! empty( $keywords_component ) ) {
				$udf['taxonomy']['internal_search_keywords'] = array_filter( $keywords_component );
			}
		}

		$content_lifecycle = array_key_exists( 'content_lifecycle', $meta ) ? $meta['content_lifecycle'] : '';
		if ( ! empty( $content_lifecycle ) && 'none' !== $content_lifecycle ) {
			$udf['meta']['content_life_cycle'] = $content_lifecycle;
		}

		$udf['meta']['facebook_news_opinion']   = array_key_exists( 'facebook_news_opinion', $meta ) ? true : false;
		$udf['meta']['facebook_news_blacklist'] = array_key_exists( 'facebook_news_blacklist', $meta ) ? true : false;

		if ( ! empty( $udf['meta'] ) && empty( $udf['meta']['_type'] ) ) {
			$udf['meta']['_type'] = 'meta';
		}

		return $udf;
	}

}
