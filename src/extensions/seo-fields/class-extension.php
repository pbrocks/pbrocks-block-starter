<?php
/**
 * Register OneCMS SEO Fields extension
 *
 * @package WordPress
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Seo_Fields;

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
		'seo_box',
		'title_box',
	];

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'seo-fields';
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
			'meta_title'           => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'canonical_url'        => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'description_override' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'robots_no_index'      => [
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
			'robots_no_follow'     => [
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
			'include_in_sitemap'   => [
				'object_type'       => 'post',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'boolean',
				'default'           => true,
				'sanitize_callback' => function ( $value ) {
					// @see https://core.trac.wordpress.org/ticket/48363
					return $value ? '1' : '0';
				},
			],
			'news_content'         => [
				'object_type'       => 'post',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'boolean',
				'default_callback'  => function ( int $post_id ) : bool {
					$type = get_post_type( $post_id );

					if ( get_option( "send_to_google_news_{$type}" ) === 'no' ) {
						return false;
					}

					return true;
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
		if ( ! empty( $meta['meta_title'] ) ) {
			$udf['meta']['title'] = apply_filters( 'unified_filter_html', $meta['meta_title'], 'String' );
		}

		if ( ! empty( $meta['description_override'] ) ) {
			$udf['meta']['description'] = apply_filters( 'unified_filter_html', $meta['description_override'], 'String' );
		}

		if ( ! empty( $meta['canonical_url'] ) ) {
			$udf['meta']['canonical'] = apply_filters( 'unified_filter_html', $meta['canonical_url'], 'Url' );
		}

		if ( isset( $meta['include_in_sitemap'] ) ) {
			$udf['meta']['exclude_from_sitemap'] = apply_filters( 'unified_filter_html', ! ( $meta['include_in_sitemap'] ), 'Boolean' );
		}

		if ( isset( $meta['news_content'] ) ) {
			$udf['taxonomy']['news_content'] = apply_filters( 'unified_filter_html', $meta['news_content'], 'Boolean' );
		}

		if ( ! empty( $meta['robots_no_follow'] ) ) {
			$robots[] = 'nofollow';
		}

		if ( ! empty( $meta['robots_no_index'] ) ) {
			$robots[] = 'noindex';
		}

		if ( ! empty( $robots ) ) {
			$udf['meta']['robots'] = apply_filters( 'unified_filter_html', implode( ',', $robots ), 'String' );
		}

		if ( ! empty( $udf['meta'] ) && empty( $udf['meta']['_type'] ) ) {
			$udf['meta']['_type'] = 'meta';
		}

		return $udf;
	}

}
