/**
 * WordPress dependencies
 */
import { CheckboxControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import { ImageControl } from '@meredithcorp/onecms-components';

/**
 * Internal dependencies
 */
import { UgcImageControl } from 'components';

/**
 * Social Image Component.
 *
 * @param {Object} props The component props.
 * @return {Object} The Social Image Component.
 */
const SocialImage = ( props ) => {
	const {
		setSocialImageType,
		socialImageType,
		socialImageAutocrop,
		socialImageId,
		updateSocialImageAutocrop,
		updateSocialImageId,
	} = props;

	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostAttribute( 'type' ) );
	const brand = useSelect( ( select ) => select( 'core/editor' ).getEditorSettings().onecms.site.brand );

	const enableUgcOption = ( postType === 'recipe' ) && ( brand === 'alrcom' );

	return (
		<>
			{ ! enableUgcOption && (
				<ImageControl
					image={ socialImageId }
					onSelect={ ( value ) => {
						const properValue = value.id === undefined ? '' : value.id.toString();

						updateSocialImageId( properValue );
					} }
				/>
			) }

			{ enableUgcOption && (
				<div>
					<SelectControl
						label="Choose image type"
						onChange={ ( value ) => {
							updateSocialImageId( '' );
							setSocialImageType( value );
						} }
						options={ [
							{ label: 'Image', value: 'image' },
							{ label: 'UGC Image', value: 'ugc-image' },
						] }
						value={ socialImageType }
					/>
					{ socialImageType === 'image' && (
						<ImageControl
							image={ socialImageId }
							onSelect={ ( value ) => {
								const properValue = ( value.id === undefined ) ? '' : value.id.toString();

								updateSocialImageId( properValue );
							} }
						/>

					) }
					{ socialImageType === 'ugc-image' && (
						<UgcImageControl
							image={ socialImageId }
							onSelect={ ( image ) => updateSocialImageId( image ) }
						/>
					) }
				</div>
			) }

			<CheckboxControl
				checked={ socialImageAutocrop }
				label="Auto-crop Image?"
				onChange={ ( isChecked ) => {
					updateSocialImageAutocrop( isChecked );
				} }
			/>
		</>
	);
};

export default SocialImage;
