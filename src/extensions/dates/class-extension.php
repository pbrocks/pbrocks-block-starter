<?php
/**
 * Register OneCMS Date Time extension
 *
 * @package OneCMS
 * @subpackage Block_Editor
 */

namespace OneCMS\Block_Editor\Block_Editor\Extensions\Dates;

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
		'dates_box',
	];

	/**
	 * Block name.
	 *
	 * @return string
	 */
	public function name() : string {
		return 'dates';
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
			'created_date'   => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'publish_date'   => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'last_updated'   => [
				'object_type'  => 'post',
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			],
			'show_date'      => [
				'object_type'      => 'post',
				'show_in_rest'     => true,
				'single'           => true,
				'type'             => 'string',
				'default_callback' => function ( int $post_id ) : string {
					$type = get_post_type( $post_id );

					return get_option( "display_date_options_{$type}", 'none' );
				},
			],
			'last_optimized' => [
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
		// Get dates as DateTime objects, or null, as necessary.
		$created_date   = self::get_datetime( $post->ID, 'created_date', $meta, $post->post_date_gmt );
		$last_updated   = self::get_datetime( $post->ID, 'last_updated', $meta, $post->post_modified_gmt );
		$publish_date   = self::get_datetime( $post->ID, 'publish_date', $meta, $post->post_date_gmt );
		$last_optimized = self::get_datetime( $post->ID, 'last_optimized', $meta );

		/**
		 * The publish_date is required in UDF, but we don't want to save it in
		 * our database until the content is actually published. Therefore, if
		 * the content is not yet published, we should use the last modified
		 * date as the publish date so we can ensure UDF validation.
		 */
		if ( 'publish' !== $post->post_status ) {
			$publish_date = $last_updated;
		}

		// Create an array of dates for conversion.
		$dates = [
			'created_date'   => $created_date,
			'publish_date'   => $publish_date,
			'last_updated'   => $last_updated,
			'last_optimized' => $last_optimized,
		];

		// Convert dates to unix timestamp with 'Z' after timezone.
		foreach ( $dates as $key => $datetime ) {
			if ( empty( $datetime ) ) {
				continue;
			}

			$udf[ $key ] = apply_filters( 'onecms_format_datetime_for_udf', $datetime );
		}

		// Display date field.
		$show_date = array_key_exists( 'show_date', $meta ) ? $meta['show_date'] : '';
		if ( ! empty( $show_date ) ) {
			$display_date = [
				'use_post_date'   => 'first-published',
				'use_post_modify' => 'last-modified',
			];

			$udf['display_date'] = $display_date[ $show_date ] ?? $show_date;
		}

		if ( 'last-optimized' !== $show_date && isset( $udf['last_optimized'] ) ) {
			unset( $udf['last_optimized'] );
		}

		return $udf;
	}

	/**
	 * Get a datetime from a meta value or optional fallback.
	 *
	 * @param int         $post_id  The Post ID.
	 * @param string      $key      The value of date.
	 * @param array       $meta     An array of meta for the content.
	 * @param null|string $fallback The fallback value.
	 *
	 * @return null|\DateTimeImmutable
	 */
	public function get_datetime( int $post_id, string $key, array $meta, ?string $fallback = null ) : ?\DateTimeImmutable {
		$value = array_key_exists( $key, $meta ) ? $meta[ $key ] : '';

		if ( empty( $value ) || ( '0000-00-00 00:00:00' === $value ) ) {
			$value = $fallback;
		}

		// Check the data again, in case the fallback is screwy.
		if ( empty( $value ) || ( '0000-00-00 00:00:00' === $value ) ) {
			return null;
		}

		try {
			$datetime = new \DateTimeImmutable( $value, new \DateTimeZone( 'UTC' ) );
		} catch ( \Exception $e ) {
			$datetime = new \DateTimeImmutable( 'now', new \DateTimeZone( 'UTC' ) );
			$datetime = $datetime->setTimestamp( $value );
		}

		if ( ! $datetime ) {
			return null;
		}

		return $datetime;
	}

}
