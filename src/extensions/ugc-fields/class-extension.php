<?php
/**
 * Register OneCMS UGC Fields extension
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Ugc_Fields;

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
		'ugc_box',
	];

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'ugc-fields';
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
			'disable_comments_checkbox' => [
				'object_type'      => 'post',
				'show_in_rest'     => true,
				'single'           => true,
				'type'             => 'string',
				'default_callback' => function ( $post_id ) : string {
					$post = get_post_type( $post_id );

					// "" === enable comments
					return get_option( "ugc_disable_comments_checkbox_{$post->post_type}" );
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
