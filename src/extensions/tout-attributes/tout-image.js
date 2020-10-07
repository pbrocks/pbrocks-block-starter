/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
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
 * Tout Image Component.
 *
 * @param {Object} props The component props.
 * @return {Object} The Tout Image Component.
 */
const ToutImage = ( props ) => {
	const {
		setToutImageType,
		toutImageType,
		toutImageId,
		updateToutImageId,
	} = props;

	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostAttribute( 'type' ) );
	const brand = useSelect( ( select ) => select( 'core/editor' ).getEditorSettings().onecms.site.brand );

	const enableUgcOption = ( postType === 'recipe' ) && ( brand === 'alrcom' );

	return (
		<>
			{ ! enableUgcOption && (
				<ImageControl
					image={ toutImageId }
					onSelect={ ( value ) => {
						const properValue = ( value.id === undefined ) ? '' : value.id.toString();

						updateToutImageId( properValue );
					} }
				/>
			) }

			{ enableUgcOption && (
				<div>
					<SelectControl
						label="Choose image type"
						onChange={ ( value ) => {
							updateToutImageId( '' );
							setToutImageType( value );
						} }
						options={ [
							{ label: 'Image', value: 'image' },
							{ label: 'UGC Image', value: 'ugc-image' },
						] }
						value={ toutImageType }
					/>
					{ toutImageType === 'image' && (
						<ImageControl
							image={ toutImageId }
							onSelect={ ( value ) => {
								const properValue = ( value.id === undefined ) ? '' : value.id.toString();

								updateToutImageId( properValue );
							} }
						/>

					) }
					{ toutImageType === 'ugc-image' && (
						<UgcImageControl
							image={ toutImageId }
							onSelect={ ( image ) => updateToutImageId( image ) }
						/>
					) }
				</div>
			) }
		</>
	);
};

export default ToutImage;
