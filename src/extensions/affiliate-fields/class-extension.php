<?php
/**
 * Register OneCMS Affiliate Fields extension
 *
 * @package WordPress
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Affiliate_Fields;

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
		'ecomm_affiliate_box',
	];

	/**
	 * Extension name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'affiliate-fields';
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
			'content_affiliate_disclaimer' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'boolean',
			],
			'content_affiliate_disclaimer_override' => [
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
		return null;
	}

}
