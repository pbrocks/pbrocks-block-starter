<?php
/**
 * Register OneCMS Aggregate Fields
 *
 * @package WordPress
 * @subpackage Onecms_homepage
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Aggregate_Fields;

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
	public $replaces = [];

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'aggregate-fields';
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
		// Set default aggregate variant for Food brands.
		$supports = apply_filters( 'onecms_brand_supports', [] );
		$default  = 'core';
		if ( in_array( 'category-variant-food', $supports, true ) ) {
			$default = 'food';
		}
		return [
			'aggregate_page_variant' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => $default,
			],
			'aggregate_page_sub_variant' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => 'default',
			],
			'aggregate_page_edit_program_name' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'aggregate_page_edit_program_logo_id' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'integer',
			],
			'subcategory_overrides' => [
				'object_type'  => 'post',
				'single'       => false,
				'type'         => 'integer',
				'default'      => [],
				'show_in_rest' => true,
			],
			'subnav_toggle' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => 'off',
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
