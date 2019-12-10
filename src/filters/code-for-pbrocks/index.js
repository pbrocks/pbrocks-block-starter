/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { addFilter } from '@wordpress/hooks';

import { Fragment } from '@wordpress/element';

import { InspectorControls } from '@wordpress/block-editor';

import { createHigherOrderComponent, withState } from '@wordpress/compose';

import {
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import classnames from 'classnames';

addFilter(
	'blocks.registerBlockType',
	'pbrocks-block-starter/add-code-attributes',
	addCodeAttributes
);

addFilter(
	'editor.BlockEdit',
	'pbrocks-block-starter/add-code-inspector-controls',
	addCodeInspectorControls
);

addFilter(
	'blocks.getSaveElement',
	'pbrocks-block-starter/modify-code-save-settings',
	modifyCodeSaveSettings
);

function addCodeAttributes( settings, name ) {
	if ( 'core/code' !== name ) {
		return settings;
	}

	settings.title = __( 'PBrocks Code', 'pbrocks-block-starter' );

	settings.description = __(
		'PBrocks Code is used when you want code to be unparsed, ie displayed as written',
		'pbrocks-block-starter'
	);

	settings.supports = lodash.merge( {}, settings.supports, {
		align: [ 'full', 'wide' ],
	} );
	settings.attributes.align = {
		type: 'string',
		default: 'full',
	};
	settings.attributes.highContrast = {
		type: 'boolean',
		default: false,
	};
	return settings;
}

const MyTextControl = withState( {
	className: 'pbrocks-css',
} )( ( { className, setState } ) => (
	<TextControl
		label="Add PBrocks CSS Class"
		value={ className }
		onChange={ ( className ) => setState( { className } ) }
	/>
) );
function addCodeInspectorControls( BlockEdit ) {
	const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
		return ( props ) => {
			if ( 'core/code' !== props.name ) {
				return <BlockEdit { ...props } />;
			}

			return (
				<Fragment>
					<div
						className={ classnames( {
							'high-contrast': props.attributes.highContrast,
						} ) }
					>
						<BlockEdit { ...props } />
					</div>
					<InspectorControls>
						<PanelBody
							title={ __(
								'PBrocks Code Settings',
								'pbrocks-block-starter'
							) }
							icon="welcome-widgets-menus"
							initialOpen={ true }
						>
							<PanelRow>
								<MyTextControl />
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={ __(
										'High Contrast',
										'pbrocks-block-starter'
									) }
									checked={ props.attributes.highContrast }
									onChange={ ( highContrast ) =>
										props.setAttributes( { highContrast } )
									}
								/>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				</Fragment>
			);
		};
	} );
	return withInspectorControls( BlockEdit );
}

function modifyCodeSaveSettings( el, block, attributes ) {
	if ( 'core/code' === block.name && attributes.highContrast ) {
		el.props.className = classnames( el.props.className, {
			'high-contrast': attributes.highContrast,
		} );
	}
	return el;
}
