<?php
/**
 * Register the Sweepstakes Metadata Extension.
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Sweepstakes_Metadata;

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
		return 'sweepstakes-metadata';
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
			'variant' => [
				'object_type'    => 'post',
				'object_subtype' => 'sweepstakes',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'string',
				'default'        => 'core',
			],
			'entry_limit' => [
				'object_type'    => 'post',
				'object_subtype' => 'sweepstakes',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'string',
				'default'        => 'multiple',
			],
			'winner_limit' => [
				'object_type'    => 'post',
				'object_subtype' => 'sweepstakes',
				'show_in_rest'   => true,
				'single'         => true,
				'type'           => 'integer',
				'default'        => 1,
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
		$udf['variant'] = ! empty( $meta['variant'] ) ? $meta['variant'] : 'core';

		$udf['entry_limit'] = ! empty( $meta['entry_limit'] ) ? apply_filters( 'unified_filter_html', $meta['entry_limit'], 'String' ) : 'multiple';

		$udf['winner_limit'] = ! empty( $meta['winner_limit'] ) ? apply_filters( 'unified_filter_html', $meta['winner_limit'], 'Integer' ) : 1;

		return $udf;
	}

}
