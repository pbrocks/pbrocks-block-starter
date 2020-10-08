<?php
/**
 * Register the Category extension
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Categories;

use OneCMS\Block_Framework\Extensions\Extension_Interface;
use WP_Post;

/**
 * Category  extension
 */
class Extension implements Extension_Interface {

	/**
	 * Metaboxes this extension replaces.
	 *
	 * @var array
	 */
	public $replaces = [
		'categories_box',
		'editorial_program_box',
		'content_property_box',
		'creative_work',
	];

	/**
	 * Extension name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'categories';
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
			'primary_category' => [
				'object_type'  => 'post',
				'single'       => true,
				'type'         => 'integer',
				'show_in_rest' => true,
			],
			'secondary_categories' => [
				'object_type'  => 'post',
				'single'       => false,
				'type'         => 'integer',
				'default'      => [],
				'show_in_rest' => true,
			],
			'editorial_program_type' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => 'category',
			],
			'editorial_program_category' => [
				'object_type'  => 'post',
				'single'       => true,
				'type'         => 'integer',
				'show_in_rest' => true,
			],
			'editorial_program_tag' => [
				'object_type'  => 'post',
				'single'       => true,
				'type'         => 'integer',
				'show_in_rest' => true,
			],
			'editorial_program_cw' => [
				'object_type'       => 'post',
				'show_in_rest'      => [
					'prepare_callback' => function ( $value ) : string {
						return apply_filters(
							'onecms_graph_id',
							$value,
							[
								'id' => $value,
							]
						);
					},
				],
				'single'            => true,
				'type'              => 'string',
				'sanitize_callback' => function ( $value ) {
					$exploded = explode( '_', $value );

					return end( $exploded );
				},
			],
			'onecms_content_property' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'type'         => 'string',
				'single'       => false,
				'default'      => [],
			],
			'onecms_creative_work_entities' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'type'         => 'string',
				'single'       => false,
				'default'      => [],
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
		if ( ! empty( $meta['primary_category'] ) ) {
			$udf['taxonomy']['category'] = apply_filters( 'build_term_component', $meta['primary_category'], 'category' );
		}

		if ( ! empty( $meta['secondary_categories'] ) ) {
			$udf['taxonomy']['secondary_categories'] = self::build_term_array( $meta['secondary_categories'], 'category' );
		}

		$content_properties = array_key_exists( 'onecms_content_property', $meta ) ? $meta['onecms_content_property'] : '';
		if ( ! empty( $content_properties ) ) {
			foreach ( $content_properties as $content_property ) {
				$udf['taxonomy']['content_properties'][] = [
					'entity' => [
						'$id' => $content_property,
					],
				];
			}
		}

		if ( ! empty( $udf['taxonomy'] ) && empty( $udf['taxonomy']['_type'] ) ) {
			$udf['taxonomy']['_type'] = 'taxonomy';
		}

		$editorial_program_type  = $meta['editorial_program_type'];
		$editorial_program_field = "editorial_program_$editorial_program_type";
		$term_id                 = get_post_meta( $post->ID, $editorial_program_field, true );

		if ( empty( $term_id ) ) {
			return $udf;
		}

		switch ( $editorial_program_type ) {
			case 'cw':
				$term_component = apply_filters( 'build_term_component', $meta['editorial_program_cw'], 'creative_work' );
				break;

			case 'category':
				$term_component = apply_filters( 'build_term_component', $meta['editorial_program_category'], 'category' );
				break;

			case 'tag':
				$term_component = apply_filters( 'build_term_component', $meta['editorial_program_tag'], 'post_tag' );
				break;
		}

		if ( ! empty( $term_component ) ) {
			$udf['taxonomy']['editorial_programs'][] = $term_component;
		}

		return $udf;
	}

	/**
	 * Build an array of terms for a set of term IDs.
	 *
	 * @param array  $term_ids Array of term ids.
	 * @param string $taxonomy The taxonomy name.
	 *
	 * @return array Array of terms.
	 */
	public static function build_term_array( $term_ids, $taxonomy ) : array {
		if ( empty( $term_ids ) ) {
			return [];
		}

		$terms = array_map(
			function( $term_id ) use ( $taxonomy ) {
				if ( empty( $term_id ) ) {
					return null;
				}

				return apply_filters( 'build_term_component', $term_id, $taxonomy );
			},
			$term_ids
		);

		// Remove all "null" terms.
		$terms = array_filter( $terms );

		return $terms;
	}

}
