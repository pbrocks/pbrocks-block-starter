<?php
/**
 * Register OneCMS Syndication Fields Extension
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Syndication_Fields;

use OneCMS\Block_Framework\Extensions\Extension_Interface;
use WP_Post;

/**
 * Class Extension
 */
class Extension implements Extension_Interface {

	/**
	 * Metaboxes which this extension replaces.
	 *
	 * @var array
	 */
	public $replaces = [
		'syndication_box',
	];

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'syndication-fields';
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
			'content_syndicated'  => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => 'all',
			],
			'content_rights'      => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'content_right_notes' => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'syndicated_entity'   => [
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
		if ( ! empty( $meta['content_syndicated'] ) ) {
			$udf['meta']['content_syndicated'] = $meta['content_syndicated'];
		}

		if ( ! empty( $meta['content_rights'] ) ) {
			$udf['meta']['content_rights'] = $meta['content_rights'];
		}

		if ( ! empty( $meta['content_right_notes'] ) ) {
			$udf['meta']['content_right_notes'] = apply_filters( 'unified_filter_html', $meta['content_right_notes'], 'String' );
		}

		if ( ! empty( $meta['syndicated_entity'] ) ) {
			$udf['meta']['shared_content'] = [
				'$id' => $meta['syndicated_entity'],
			];
		}

		return $udf;
	}

}
