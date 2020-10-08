/**
 * WordPress dependencies
 */
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * External dependencies
 */
import { IfPostType, UrlControl } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';

/**
 * Rule Metadata for Rule component
 *
 * @return {Object} A component consisting of settings that belongs to rule.
 */
const RuleMetadata = () => {
	const [ urlOverride, updateUrlOverride ] = useMeta( 'url_override' );
	const [ prizeOffering, updatePrizeOffering ] = useMeta( 'prize_offering' );

	useEffect( () => {
		if ( prizeOffering === '' ) {
			updatePrizeOffering( 'prize-choice' );
		}
	}, [ prizeOffering ] );

	return (
		<IfPostType types={ [ 'rule' ] }>
			<PluginDocumentSettingPanel
				icon="admin-links"
				name="ruleMetadata"
				title="Rule Metadata"
			>
				<UrlControl
					label="URL Override"
					onChange={ ( value ) => updateUrlOverride( value ) }
					placeholder="https://www..."
					value={ urlOverride }
				/>
				<SelectControl
					label="Prize offering"
					onChange={ ( value ) => updatePrizeOffering( value ) }
					options={ [
						{ label: 'Prize Choice', value: 'prize-choice' },
						{ label: 'Prize Only', value: 'prize-only' },
					] }
					value={ prizeOffering }
				/>
			</PluginDocumentSettingPanel>
		</IfPostType>
	);
};

registerPlugin( 'onecms-rule-metadata', { render: RuleMetadata } );
