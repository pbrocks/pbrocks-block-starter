<?php
/**
 *
 */

add_filter( 'render_block', 'pbrocks_block_starter_article_hero_header', 10, 2 );
/**
 * [pbrocks_block_starter_article_hero_header]
 *
 * @param  array $block_content Block content.
 * @param  array $block         Block info.
 * @return array                Block content.
 */
function pbrocks_block_starter_article_hero_header( $block_content, $block ) {
	if ( 'pbrocks-block-starter/article-hero-header' === $block['blockName'] ) {
		$block_content = "<div style='border:2px solid tomato;height:44vh;' class='wp-block' data-blockType='{$block['blockName']}'>{$block_content}<h5 style=\"color:tomato\">{$block['blockName']}</h5></div>";
	}
	return $block_content;
}

add_action( 'render_article_hero_header', 'render_article_hero_header' );
/**
 * [render_article_hero_header description]
 *
 * @param  array $atts [description]
 * @return array       [description]
 */
function render_article_hero_header( $atts ) {
	ob_start(); ?>
	<?php
	if ( isset( $atts['jsx_render_heading'] ) ) {
		$jsx_render_heading = $atts['jsx_render_heading'];
	} else {
		$jsx_render_heading = '24 Hours on the ISS';
	}

	if ( isset( $atts['jsx_render_subheading'] ) ) {
		$jsx_render_subheading = $atts['jsx_render_heading'];
	} else {
		$jsx_render_subheading = 'After 20 years, humans continue to live on the International Space Station, working together to make breakthroughs not possible on Earth.';
	}

	if ( isset( $atts['chapter'] ) ) {
		$chapter = $atts['jsx_render_heading'];
	} else {
		$chapter = 'Chapter 1';
	}

	if ( isset( $atts['focalpoint']['focalPoint'] ) ) {
		$x = $atts['focalpoint']['focalPoint']['x'] * 100;
		$y = $atts['focalpoint']['focalPoint']['y'] * 100;
	} else {
		$x = '0';
		$y = '0';
	}

	// Get subheading
	if ( isset( $atts['background_url'] ) ) {
		$background_url = $atts['background_url'];
	} elseif ( ! isset( $atts['media_type'] ) ) {
		$background_url = plugin_dir_url( __DIR__ ) . '/assets/sample-image.jpeg';
	}

	$formats = array( '.mp4', '.m4v', '.webm', '.ogv', '.wmv', '.flv' );
	$media_type = 'image';
	foreach ( $formats as $format ) {
		if ( strpos( $background_url, $format ) !== false ) {
			$media_type = 'video';
		}
	}

	if ( $media_type == 'video' && ! isset( $atts['background_url'] ) ) {
			$background_url = plugin_dir_url( __DIR__ ) . '/assets/sample-video.mp4';
	}

	// Get subheading
	if ( isset( $atts['background_url'] ) ) {
		$background_url = $atts['background_url'];
	} elseif ( ! isset( $atts['media_type'] ) ) {
		$background_url = plugin_dir_url( __FILE__ ) . '/media/super-nebula.jpeg';
	}

	if ( isset( $atts['focalpoint']['focalPoint'] ) ) {
		$x = $atts['focalpoint']['focalPoint']['x'] * 100;
		$y = $atts['focalpoint']['focalPoint']['y'] * 100;
	} else {
		$x = '0';
		$y = '0';
	}

	// Now we handle the actual markup.
	?>
<style type="text/css">
.article-hero {
	margin-bottom: 60px;
}

.article-section {
	padding-top: 0;
}

/* aside.article-aside {
	padding-top: 100vh;
} */

.article-aside-wrapper {
	margin-top: 0;
}

@media screen and (max-width: 800px){
	aside.article-aside {
		padding-top: 0;
	}

	body .article-section {
		padding: 0!important;
	}

	.article-section > * {
		padding-left: 25px;
		padding-right: 25px;
	}
}
</style>
<script>
	jQuery( document ).ready(function() {
		jQuery(".article-hero").prependTo(".article-section");
	});
</script>
<section class="article-hero min-height-screen wp-block wp-block-cover d-flex flex-align-center dark">
	<img class="wp-block-cover__image-background" style="object-position: <?php echo $x; ?>% <?php echo $y; ?>%" src="<?php echo $background_url; ?>">
	<div class="overlay-skrim d-flex flex-align-end" style="left: 0;">
		<div class="container">
			<div class="article-hero-content animation-fadeinup">
				<p class="subheading mt-0 mb-md"><?php hds_display_reading_time( get_the_id() ); ?> min read</p>
				<h1 class="article-hero-heading"><?php the_title(); ?></h1>
			</div>
		</div>
	</div>
</section>
	<?php
		$return_string = ob_get_contents();
		 ob_end_clean();
		 return $return_string;
}
