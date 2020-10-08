<?php
/**
 * Register the author bylines extension
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Bylines;

use OneCMS\Block_Framework\Extensions\Extension_Interface;
use WP_Post;

/**
 * Author bylines extension
 */
class Extension implements Extension_Interface {

	/**
	 * Metaboxes this extension replaces.
	 *
	 * @var array
	 */
	public $replaces = [
		'byline',
	];

	/**
	 * Extension name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'bylines';
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
		$byline_schema = [
			'schema'           => [
				'items' => [
					'type'       => 'object',
					'properties' => [
						'id'          => [
							'type' => 'string',
						],
						'designation' => [
							'type' => 'string',
						],
					],
				],
			],
			'prepare_callback' => function ( $value ) : array {
				return array_map(
					function ( array $item ) : array {
						// Ensures that IDs are always cast as a string.
						$item['id'] = (string) $item['id'];

						return $item;
					},
					$value
				);
			},
		];

		return [
			'primary_byline_group'           => [
				'object_type'  => 'post',
				'show_in_rest' => $byline_schema,
				'single'       => true,
				'type'         => 'array',
			],
			'secondary_byline_group'         => [
				'object_type'  => 'post',
				'show_in_rest' => $byline_schema,
				'single'       => true,
				'type'         => 'array',
			],
			'meta_byline_override'           => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'meta_secondary_byline_override' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'meta_original_source' => [
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
		$primary_bylines = $meta['primary_byline_group'];
		if ( is_array( $primary_bylines ) && ! empty( $primary_bylines[0]['id'] ) ) {
			foreach ( $primary_bylines as $primary_byline ) {
				if ( ! empty( $primary_byline['id'] ) ) {
					$udf['bylines']['primary']['authors'][] = [
						'$id' => apply_filters(
							'onecms_graph_id',
							'',
							[
								'table' => 'terms',
								'id'    => $primary_byline['id'],
							]
						),
					];
				}
			}
		}

		$secondary_bylines = $meta['secondary_byline_group'];
		if ( is_array( $secondary_bylines ) && ! empty( $secondary_bylines[0]['id'] ) ) {
			foreach ( $secondary_bylines as $secondary_byline ) {
				if ( ! empty( $secondary_byline['id'] ) ) {
					$udf['bylines']['secondary']['authors'][] = [
						'$id' => apply_filters(
							'onecms_graph_id',
							'',
							[
								'table' => 'terms',
								'id'    => $secondary_byline['id'],
							]
						),
					];
				}
			}
		}

		if ( ! empty( $meta['meta_byline_override'] ) ) {
			$udf['bylines']['primary']['override'] = apply_filters( 'unified_filter_html', $meta['meta_byline_override'], 'InlineHtml' );
		}

		if ( ! empty( $meta['meta_secondary_byline_override'] ) ) {
			$udf['bylines']['secondary']['override'] = apply_filters( 'unified_filter_html', $meta['meta_secondary_byline_override'], 'InlineHtml' );
		}

		if ( ! empty( $meta['meta_original_source'] ) ) {
			$udf['original_source'] = apply_filters( 'unified_filter_html', $meta['meta_original_source'], 'InlineHtml' );
		}

		return $udf;
	}

}
