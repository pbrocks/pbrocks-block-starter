/**
 * WordPress dependencies
 */
import {
	Button,
	ButtonGroup,
	ClipboardButton,
	Modal,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { ContentGraphLog } from '@meredithcorp/onecms-components';
import { get } from 'lodash';
import { css } from 'emotion';

/**
 * Buttons for evaluating and validating UDF.
 *
 * @param {Object} props The component props.
 * @return {Object} The UDF dev tools.
 */
const UdfDevTools = ( props ) => {
	const {
		graphResult,
		graphStatus,
		udfLinks,
	} = props;

	const [ isOpen, setIsOpen ] = useState( false );
	const [ hasCopied, setHasCopied ] = useState( false );

	const graphIcon = {
		success: 'yes-alt',
		error: 'dismiss',
		warning: 'warning',
	};

	const styles = {
		container: css`
			display: flex;
			justify-content: space-between;
			width: 100%;
		`,
		graphIcon: {
			success: {
				color: 'green',
			},
			error: {
				color: 'red',
			},
			warning: {
				color: 'orange',
			},
		},
		buttonGroup: css`
			flex: 1;
		`,
		modal: css`
			width: 40em;
			height: 20em;
		`,
		actions: css`
			margin-top: 2em;
		`,
	};

	if ( udfLinks === null || udfLinks === undefined ) {
		return null;
	}

	return (
		<PluginPostStatusInfo>
			<div className={ styles.container }>
				<ButtonGroup className={ styles.buttonGroup }>
					{ udfLinks.map( ( link, index ) => (
						<Button
							href={ link.url }
							icon={ link.icon }
							isDefault
							key={ `devtool-${ index }` }
							label={ link.title }
							target="_blank"
						/>
					) ) }
				</ButtonGroup>

				<Button
					icon={ graphIcon[ graphStatus ] }
					isDefault
					label="Content Graph Log"
					onClick={ () => setIsOpen( true ) }
					style={ styles.graphIcon[ graphStatus ] }
				/>
			</div>
			{ isOpen && (
				<Modal
					onRequestClose={ () => setIsOpen( false ) }
					title="Content Graph Log"
				>
					<div className={ styles.modal }>
						<ContentGraphLog result={ graphResult } />
					</div>

					{ !! graphResult.length && (
						<div className={ styles.actions }>
							<ClipboardButton
								isSecondary
								onCopy={ () => setHasCopied( true ) }
								onFinishCopy={ () => setHasCopied( false ) }
								text={ JSON.stringify( graphResult ) }
							>
								{ hasCopied ? 'Copied!' : 'Copy Log' }
							</ClipboardButton>
						</div>
					) }
				</Modal>
			) }
		</PluginPostStatusInfo>
	);
};

const applyWithSelect = withSelect( ( select ) => {
	const {
		getCurrentPost,
	} = select( 'core/editor' );

	const post = getCurrentPost();

	const graphResult = get( post, 'onecms_content_graph_log.result', [] );

	let graphStatus = get( post, 'onecms_content_graph_log.status', 'warning' );

	graphStatus = [ 'success', 'error' ].includes( graphStatus ) ? graphStatus : 'warning';

	return {
		udfLinks: post.onecms_udf_devtool_links,
		graphStatus,
		graphResult,
	};
} );

const WrappedUdfDevTools = compose( applyWithSelect )( UdfDevTools );

registerPlugin( 'onecms-udf-dev-tools', { render: WrappedUdfDevTools } );
