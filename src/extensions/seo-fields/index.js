/**
 * WordPress dependencies
 */
import {
	TextControl,
	TextareaControl,
	CheckboxControl,
	PanelBody,
} from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { ExtensionSidebar } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Sidebar for OneCMS Metadata.
 *
 * @return {Object} The UDF dev tools.
 */
const SeoFieldsSidebar = () => {
	const [ metaTitle, updateMetaTitle ] = useMeta( 'meta_title' );
	const [ includeInGoogleNewsSitemap, updateIncludeInGoogleNewsSitemap ] = useMeta( 'news_content' );
	const [ canonicalUrl, updateCanonicalUrl ] = useMeta( 'canonical_url' );
	const [ robotsNoIndex, updateRobotsNoIndex ] = useMeta( 'robots_no_index' );
	const [ robotsNoFollow, updateRobotsNoFollow ] = useMeta( 'robots_no_follow' );
	const [ includeInSitemap, updateIncludeInSitemap ] = useMeta( 'include_in_sitemap' );
	const [ descriptionOverride, updateDescriptionOverride ] = useMeta( 'description_override' );

	return (
		<ExtensionSidebar
			icon="welcome-view-site"
			name="onecms-seo-fields"
			title="OneCMS SEO Fields"
		>
			<PanelBody
				initialOpen={ true }
			>
				<TextControl
					label="Canonical URL"
					onChange={ ( value ) => updateCanonicalUrl( value ) }
					value={ canonicalUrl }
				/>
				<TextControl
					label="Meta Title"
					onChange={ ( value ) => updateMetaTitle( value ) }
					value={ metaTitle }
				/>
				<TextareaControl
					label="Meta Description Override"
					onChange={ ( value ) => updateDescriptionOverride( value ) }
					value={ descriptionOverride }
				/>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title="Advanced"
			>
				<CheckboxControl
					checked={ robotsNoIndex }
					label="Robots (No Index)"
					onChange={ ( value ) => updateRobotsNoIndex( value ) }
				/>
				<CheckboxControl
					checked={ robotsNoFollow }
					label="Robots (No Follow)"
					onChange={ ( value ) => updateRobotsNoFollow( value ) }
				/>
				<CheckboxControl
					checked={ includeInSitemap }
					label="Include in XML Sitemap"
					onChange={ ( value ) => updateIncludeInSitemap( value ) }
				/>
				<CheckboxControl
					checked={ includeInGoogleNewsSitemap }
					label="Include in Google News XML Sitemap"
					onChange={ ( value ) => updateIncludeInGoogleNewsSitemap( value ) }
				/>
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-seo-fields', { render: SeoFieldsSidebar } );
