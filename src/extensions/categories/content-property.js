/**
 * WordPress dependencies
 */
import { PanelBody, CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { uniq, isNull, isEmpty } from 'lodash';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * The Content Property panel.
 *
 * @return {Object} The Content Property fields.
 */
const ContentProperty = () => {
	const [ onecmsContentProperty, updateOnecmsContentProperty ] = useMeta( 'onecms_content_property' );

	const [ excludeFromHome, updateExcludeFromHome ] = useState( ! isEmpty( onecmsContentProperty ) && ! isNull( onecmsContentProperty ) );

	/**
	 * Adding a single item for content Property.
	 *
	 * @param {Object} item The value to add to the list.
	 */
	const addContentProperty = ( item ) => {
		updateOnecmsContentProperty( uniq( [
			...onecmsContentProperty,
			item.id,
		] ) );
	};

	/**
	 * Adding a single item for content Property.
	 *
	 * @param {Object} item The value to add to the list.
	 */
	const removeContentProperty = ( item ) => {
		const index = onecmsContentProperty.indexOf( item.id );

		if ( index > -1 ) {
			onecmsContentProperty.splice( index, 1 );
		}

		const updatedProperties = uniq( [ ...onecmsContentProperty ] );

		updateOnecmsContentProperty( updatedProperties.length > 1 ? updatedProperties : null );
	};

	return (
		<PanelBody
			initialOpen={ true }
			title="Content Property"
		>
			<CheckboxControl
				checked={ excludeFromHome }
				label="Exclude : Homepage"
				onChange={ ( value ) => {
					updateExcludeFromHome( value );

					const excludeData = { id: 'cms/onecms_terms_47' };

					if ( value ) {
						addContentProperty( excludeData );

						return;
					}

					removeContentProperty( excludeData );
				} }
			/>
		</PanelBody>
	);
};

export default ContentProperty;
