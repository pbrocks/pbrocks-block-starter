/**
 * WordPress dependencies
 */
import { PanelBody, SelectControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { useMeta } from '@meredithcorp/onecms-utils';
import { ExtensionSidebar } from '@meredithcorp/onecms-components';

/**
 * Sidebar for OneCMS saga fields.
 *
 * @return {Object} The sidebar.
 */
const SagaFieldsSidebar = () => {
	const [ excludeFromSaga, updateExcludeFromSaga ] = useMeta( 'exclude_from_saga_option' );

	return (
		<ExtensionSidebar
			icon="format-video"
			name="onecms-saga-fields"
			title="OneCMS Sagas"
		>
			<PanelBody
				initialOpen={ true }
			>
				<SelectControl
					label="Exclude from Saga"
					onChange={ ( value ) => updateExcludeFromSaga( value ) }
					options={ [
						{ label: 'Yes', value: true },
						{ label: 'No', value: false },
					] }
					value={ excludeFromSaga }
				/>
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-saga-fields', { render: SagaFieldsSidebar } );
