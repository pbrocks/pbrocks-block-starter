<?php
/**
 * Register the Block Editor preview extension.
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Preview;

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
		return 'preview';
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
		return [];
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
