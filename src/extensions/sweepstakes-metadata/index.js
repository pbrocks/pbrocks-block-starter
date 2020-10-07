/**
 * WordPress dependencies
 */
import { SelectControl, TextControl } from '@wordpress/components';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { useEffect } from '@wordpress/element';

/**
 * External dependencies
 */
import { IfPostType } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { useFieldValidation } from 'utils';
import { FieldValidationMessages } from 'components';

/**
 * Metadata for Sweepstakes component
 *
 * @return {Object} A component consisting of settings that belongs to sweepstakes.
 */
const SweepstakesMetadata = () => {
	const [ variant, updateVariant ] = useMeta( 'variant' );
	const [ numberOfEntries, updateNumberOfEntries ] = useMeta( 'entry_limit' );
	const [ numberOfWinners, updateNumberOfWinners ] = useMeta( 'winner_limit' );

	useEffect( () => {
		if ( variant === 'daily' ) {
			updateNumberOfEntries( 'daily-per-entry-page' );
		}
	}, [ variant ] );

	const messages = useFieldValidation(
		'sweepstakes-metadata',
		[
			{
				field: 'numberOfWinners',
				warning: [
					{
						message: 'You must provide the number of winners.',
						check: ( typeof numberOfWinners !== 'undefined' ) ? ( numberOfWinners >= 1 ) : true,
					},
				],
			},
		],
		[ numberOfWinners ]
	);

	return (
		<IfPostType types={ [ 'sweepstakes' ] }>
			<PluginDocumentSettingPanel
				icon="admin-generic"
				name="sweepstakesMetadata"
				title="Sweepstakes Metadata"
			>
				<SelectControl
					label="Variant"
					onChange={ ( value ) => updateVariant( value ) }
					options={ [
						{ label: 'Core', value: 'core' },
						{ label: 'Daily', value: 'daily' },
						{ label: 'External', value: 'external' },
					] }
					value={ variant }
				/>
				<SelectControl
					label="Number of Entries Allowed"
					onChange={ ( value ) => updateNumberOfEntries( value ) }
					options={ [
						{ label: 'Daily (per entry page)', value: 'daily-per-entry-page' },
						{ label: 'Daily (per sweeps)', value: 'daily-per-sweepstakes' },
						{ label: 'Multiple', value: 'multiple' },
						{ label: 'Single', value: 'single' },
					] }
					value={ numberOfEntries }
				/>
				<TextControl
					label="Number of Winners"
					onChange={ ( value ) => updateNumberOfWinners( value ) }
					type="number"
					value={ numberOfWinners }
				/>
				<FieldValidationMessages { ...messages.numberOfWinners } />
			</PluginDocumentSettingPanel>
		</IfPostType>
	);
};

registerPlugin( 'onecms-sweepstakes-metadata', { render: SweepstakesMetadata } );
