/**
 * WordPress dependencies
 */
import {
	TextControl,
	PanelBody,
	SelectControl,
	TimePicker,
	BaseControl,
} from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
import { useState } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * External dependencies
 */
import { ExtensionSidebar } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import moment from 'moment';
import { convertUtcToEst, useBrandFeature, convertEstToUtc } from 'utils';

const FORMAT_TWENTY_FOUR_HOUR = 'YYYY-MM-DD HH:mm:ss';
const FORMAT_TWELVE_HOUR = 'YYYY-MM-DD hh:mm:ss A';

/**
 * Sidebar for OneCMS date data.
 *
 * @return {Object} The date fields in a React node.
 */
const DatesSidebar = () => {
	const [ createdDateUtc ] = useMeta( 'created_date' );
	const [ publishDateUtc ] = useMeta( 'publish_date' );
	const [ lastUpdatedDateUtc ] = useMeta( 'last_updated' );
	const [ showDate, updateShowDate ] = useMeta( 'show_date' );
	const [ lastOptimizedDateUtc, updateLastOptimized ] = useMeta( 'last_optimized' );

	const [ lastOptimizedDateEst, setLastOptimizedDate ] = useState( convertUtcToEst( lastOptimizedDateUtc, FORMAT_TWENTY_FOUR_HOUR ) );

	// Detect if the brand supports the "last modified" show_date option.
	const hasLastModified = useBrandFeature( 'last-modified-date' );

	// Pre-convert the UTC values to EST for display in the UI.
	const createdDateEst = convertUtcToEst( createdDateUtc );
	const publishDateEst = convertUtcToEst( publishDateUtc );
	const lastUpdatedDateEst = convertUtcToEst( lastUpdatedDateUtc );

	// Define the options for the display date.
	const displayDateOptions = [
		{ label: 'None', value: 'none' },
		{ label: 'First Published Date', value: 'use_post_date' },
		hasLastModified ? { label: 'Last Modified Date', value: 'last-modified' } : null,
		{ label: 'Last Optimized Date', value: 'last-optimized' },
	].filter( ( value ) => ( value !== null ) );

	/**
	 * Handle a change for the last optimized date.
	 *
	 * @param {string} timestamp
	 */
	const onTimeChange = ( timestamp ) => {
		setLastOptimizedDate( timestamp );

		const utc = convertEstToUtc( timestamp, FORMAT_TWENTY_FOUR_HOUR );

		updateLastOptimized( utc );
	};

	/**
	 * Handle when the dropdown is changed.
	 *
	 * @param {string} value
	 */
	const onChangeDisplayDate = ( value ) => {
		/**
		 * If last optimized is selected as the display date, pre-populate the
		 * date/time picker with the current time.
		 */
		if ( value === 'last-optimized' && ! lastOptimizedDateUtc.length ) {
			const timestamp = moment( moment.now() ).format( FORMAT_TWENTY_FOUR_HOUR );

			onTimeChange( timestamp );
		}

		updateShowDate( value );
	};

	const postStatus = select( 'core/editor' ).getEditedPostAttribute( 'status' );
	const postDate = new Date( select( 'core/editor' ).getEditedPostAttribute( 'date' ) );
	const postDateEST = moment( postDate ).format( FORMAT_TWELVE_HOUR );
	const publishDateEstVal = ( ( postStatus === 'publish' ) && ( ! publishDateEst ) ) ? postDateEST : publishDateEst;

	return (
		<ExtensionSidebar
			icon="calendar-alt"
			name="onecms-dates"
			title="OneCMS Date & Time"
		>
			<PanelBody initialOpen={ true }>
				<SelectControl
					label="Display Date Options"
					onChange={ ( value ) => onChangeDisplayDate( value ) }
					options={ displayDateOptions }
					value={ showDate }
				/>

				<TextControl
					label="Created"
					readOnly
					value={ createdDateEst }
				/>

				<TextControl
					label="First Published"
					readOnly
					value={ publishDateEstVal }
				/>

				<TextControl
					label="Last Modified"
					readOnly
					value={ lastUpdatedDateEst }
				/>

				{ ( showDate === 'last-optimized' ) && (
					<BaseControl
						id="timepicker"
						label="Last Optimized"
					>
						<TimePicker
							currentTime={ lastOptimizedDateEst }
							is12Hour={ true }
							onChange={ ( value ) => onTimeChange( value ) }
						/>
					</BaseControl>
				) }
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-dates', { render: DatesSidebar } );
