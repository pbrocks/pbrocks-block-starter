/**
 * WordPress dependencies
 */
import {
	TextControl,
	TextareaControl,
	CheckboxControl,
	PanelBody,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import { ExtensionSidebar, IfPostType, ImageControl } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { get, includes } from 'lodash';

/**
 * Internal dependencies
 */
import SocialImage from './social-image';

/**
 * Sidebar for OneCMS Metadata.
 *
 * @return {Object} Social Field tool
 */
const SocialFieldsSidebar = () => {
	const [ socialTitle, updateSocialTitle ] = useMeta( 'social_title' );
	const [ socialDescription, updateSocialDescription ] = useMeta( 'social_description' );
	const [ pollResultSocialTitle, updatePollResultSocialTitle ] = useMeta( 'poll_result_social_title' );
	const [ pollResultSocialDescription, updatePollResultSocialDescription ] = useMeta( 'poll_result_social_description' );
	const [ socialImageId, updateSocialImageId ] = useMeta( 'social_image_id' );
	const [ socialImageAutocrop, updateSocialImageAutocrop ] = useMeta( 'social_image_autocrop' );
	const [ facebookPostCopy, updateFacebookPostCopy ] = useMeta( 'facebook_post_copy' );
	const [ pinterestDescription, updatePinterestDescription ] = useMeta( 'pinterest_description' );
	const [ pinterestImageId, updatePinterestImageId ] = useMeta( 'pinterest_image_id' );
	const [ pinterestImageAutocrop, updatePinterestImageAutocrop ] = useMeta( 'pinterest_image_autocrop' );
	const [ twitterTitle, updateTwitterTitle ] = useMeta( 'twitter_title' );

	// Adding user capabilities check.
	const currentUser = useSelect( ( select ) => select( 'core' ).getCurrentUser() );
	const currentUserCapabilities = get( currentUser, 'onecms_user_capabilities', [] );
	const canEditSocialMediaFields = currentUserCapabilities.includes( 'edit_social_media_fields' );

	const isSocialImageFromUgc = includes( socialImageId, '/' );
	const [ socialImageType, setSocialImageType ] = useState( isSocialImageFromUgc ? 'ugc-image' : 'image' );

	return (
		<ExtensionSidebar
			icon="share-alt2"
			name="onecms-social-fields"
			title="OneCMS Social Fields"
		>
			<PanelBody
				initialOpen={ true }
			>
				<TextControl
					label="Social Title"
					onChange={ ( value ) => updateSocialTitle( value ) }
					value={ socialTitle }
				/>
				<TextareaControl
					label="Social Description"
					onChange={ ( value ) => updateSocialDescription( value ) }
					value={ socialDescription }
				/>
				<IfPostType types={ [ 'poll-page' ] }>
					<TextControl
						label="Poll Results Social Title"
						onChange={ ( value ) => updatePollResultSocialTitle( value ) }
						value={ pollResultSocialTitle }
					/>
					<TextareaControl
						label="Poll Results Social Description"
						onChange={ ( value ) => updatePollResultSocialDescription( value ) }
						value={ pollResultSocialDescription }
					/>
				</IfPostType>
				<SocialImage
					setSocialImageType={ setSocialImageType }
					socialImageAutocrop={ socialImageAutocrop }
					socialImageId={ socialImageId }
					socialImageType={ socialImageType }
					updateSocialImageAutocrop={ updateSocialImageAutocrop }
					updateSocialImageId={ updateSocialImageId }
				/>
			</PanelBody>
			{ canEditSocialMediaFields &&
				<>
					<PanelBody
						icon={ ( <FacebookIcon /> ) }
						initialOpen={ false }
						title="Facebook"
					>
						<TextareaControl
							help="Facebook copy differs from Pinterest copy in that you can take more chances and show more attitude. Short and sweet is the best rule to follow."
							label="Facebook Post Copy"
							onChange={ ( value ) => updateFacebookPostCopy( value ) }
							value={ facebookPostCopy }
						/>
					</PanelBody>
					<PanelBody
						icon={ ( <PinterestIcon /> ) }
						initialOpen={ false }
						title="Pinterest"
					>
						<TextareaControl
							help="This field is for the post copy that will appear when the piece is pinned. It shouldn't be a repeat of the Headline or Dek; those show up automatically when the content is pinned. This description should contain keywords and be conversational in nature."
							label="Pinterest Description"
							onChange={ ( value ) => updatePinterestDescription( value ) }
							value={ pinterestDescription }
						/>
						<ImageControl
							blockHeight={ '0rem' }
							buttonText={ 'Select Pinterest Image Override' }
							image={ pinterestImageId }
							onSelect={ ( value ) => {
								value.id = value.id === undefined ? null : value.id;
								updatePinterestImageId( value.id );
							} }
						/>
						<CheckboxControl
							checked={ pinterestImageAutocrop }
							label="Auto-crop Image?"
							onChange={ ( isChecked ) => {
								updatePinterestImageAutocrop( isChecked );
							} }
						/>
					</PanelBody>
					<PanelBody
						icon={ ( <TwitterIcon /> ) }
						initialOpen={ false }
						title="Twitter"
					>
						<TextControl
							help="This field overrides the meta title to be used on Twitter."
							label="Twitter Title"
							onChange={ ( value ) => updateTwitterTitle( value ) }
							value={ twitterTitle }
						/>
					</PanelBody>
				</>
			}
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-social-fields', { render: SocialFieldsSidebar } );
