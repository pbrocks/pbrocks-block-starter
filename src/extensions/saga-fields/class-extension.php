<?php
/**
 * Register the Saga Fields extension
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Saga_Fields;

use OneCMS\Block_Framework\Extensions\Extension_Interface;
use WP_Post;

/**
 * Saga Fields extension
 */
class Extension implements Extension_Interface {

	/**
	 * Metaboxes this extension replaces.
	 *
	 * @var array
	 */
	public $replaces = [
		'sagas_meta_box',
	];

	/**
	 * Extension name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'saga';
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
	/**
	 * Register the metadata.
	 *
	 * @return array
	 */
	public function meta() : array {
		return [
			'exclude_from_saga_option' => [
				'object_type'       => 'post',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'boolean',
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
