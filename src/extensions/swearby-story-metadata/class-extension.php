<?php
/**
 * Register Swearby Story Metadata exteension
 *
 * @package WordPress
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Swearby_Story_Metadata;

use OneCMS\Block_Framework\Extensions\Extension_Interface;
use \WP_Post;

/**
 * Class Block
 */
class Extension implements Extension_Interface {

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'swearbt-story-metadata';
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
			'user_swearby_story_reference' => [
				'object_type'    => 'post',
				'object_subtype' => 'swearby_story',
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
		if ( ! empty( $meta['user_swearby_story_reference'] ) ) {
			$udf['user_swearby_story_reference'] = apply_filters(
				'unified_filter_html',
				$meta['user_swearby_story_reference'],
				'String'
			);
		}

		return $udf;
	}

}
