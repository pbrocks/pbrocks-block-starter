<?php
/**
 * Register OneCMS Universal Taxonomy extension
 *
 * @package WordPress
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Universal_Taxonomy;

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
		'onecms_utx',
	];

	/**
	 * Extension name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'universal-taxonomy';
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
			'utag_ids'                       => [
				'object_type'  => 'post',
				'single'       => true,
				'type'         => 'array',
				'default'      => [],
				'show_in_rest' => [
					'schema' => [
						'default' => [],
						'items'   => [
							'type' => 'string',
						],
					],
				],
			],
			'recipe_ingredient_utag_ids'     => [
				'object_type'  => 'post',
				'single'       => true,
				'type'         => 'array',
				'default'      => [],
				'show_in_rest' => [
					'schema' => [
						'default' => [],
						'items'   => [
							'type' => 'string',
						],
					],
				],
			],
			'recipe_meal_type_utag_ids'      => [
				'object_type'  => 'post',
				'single'       => true,
				'type'         => 'array',
				'default'      => [],
				'show_in_rest' => [
					'schema' => [
						'default' => [],
						'items'   => [
							'type' => 'string',
						],
					],
				],
			],
			'recipe_dish_type_utag_ids'      => [
				'object_type'  => 'post',
				'single'       => true,
				'type'         => 'array',
				'default'      => [],
				'show_in_rest' => [
					'schema' => [
						'default' => [],
						'items'   => [
							'type' => 'string',
						],
					],
				],
			],
			'recipe_cooking_method_utag_ids' => [
				'object_type'  => 'post',
				'single'       => true,
				'type'         => 'array',
				'default'      => [],
				'show_in_rest' => [
					'schema' => [
						'default' => [],
						'items'   => [
							'type' => 'string',
						],
					],
				],
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
		$universal_taxonomy = [];
		$utags_post_meta    = [
			'utag_ids',
			'recipe_ingredient_utag_ids',
			'recipe_meal_type_utag_ids',
			'recipe_dish_type_utag_ids',
			'recipe_cooking_method_utag_ids',
		];

		foreach ( $utags_post_meta as $utag ) {
			$utag_array = array_key_exists( $utag, $meta ) ? $meta[ $utag ] : [];

			if ( ! is_array( $utag_array ) || empty( $utag_array ) ) {
				continue;
			}

			$universal_taxonomy = array_merge( $universal_taxonomy, $utag_array );
		}

		$unique_universal_taxonomy = array_unique( $universal_taxonomy );
		if ( empty( $unique_universal_taxonomy ) ) {
			return [];
		}

		foreach ( $unique_universal_taxonomy as $taxonomy ) {
			$udf['taxonomy']['universal_descriptive_taxonomy'][] = [ 'id' => $taxonomy ];
		}

		return $udf;
	}

}
