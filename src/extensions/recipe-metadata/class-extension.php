<?php
/**
 * Register the Recipe Metadata Extension.
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Recipe_Metadata;

use OneCMS\Block_Framework\Extensions\Extension_Interface;
use \WP_Post;

/**
 * Extension class
 */
class Extension implements Extension_Interface {

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'recipe-metadata';
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
			'submitter_id' => [
				'object_type'    => 'post',
				'object_subtype' => 'recipe',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'string',
			],
			'source_id' => [
				'object_type'    => 'post',
				'object_subtype' => 'recipe',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'string',
			],
			'territory' => [
				'object_type'    => 'post',
				'object_subtype' => 'recipe',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'string',
			],
			'is_sponsored' => [
				'object_type'    => 'post',
				'object_subtype' => 'recipe',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'boolean',
			],
			'sponsor_entity' => [
				'object_type'    => 'post',
				'object_subtype' => 'recipe',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'string',
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
