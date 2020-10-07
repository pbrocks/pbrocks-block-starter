/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Button, ClipboardButton, Disabled } from '@wordpress/components';
import { select as selectDirect, useDispatch, useSelect } from '@wordpress/data';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { createFormPoster } from '@bigcommerce/form-poster';
import { css } from 'emotion';
import { get } from 'lodash';
import { jsonStringifySafe } from '@meredithcorp/onecms-utils';

/**
 * Get Block Preview.
 *
 * @return {Object} Promise representing the API response.
 */
const getBlockPreview = async () => {
	const {
		getCurrentPostId,
		getEditedPostContent,
	} = selectDirect( 'core/editor' );

	// Fetch the current post data.
	const previewData = {
		id: getCurrentPostId(),
		post_content: getEditedPostContent(),
	};

	const requestParams = {
		path: '/onecms/v1/preview',
		data: previewData,
		method: 'POST',
	};

	return apiFetch( requestParams );
};

/**
 * A preview module, which builds and executes a front-end preview
 * when a button is clicked.
 *
 * @return {Object} A preview button component.
 */
const Preview = () => {
	const [ isLoading, setLoading ] = useState( false );
	const [ hasCopied, setHasCopied ] = useState( false );

	const { onecms } = useSelect( ( select ) => select( 'core/editor' ).getEditorSettings() );
	const postId = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostAttribute( 'id' ) );

	const { createErrorNotice } = useDispatch( 'core/notices' );

	const styles = {
		container: css`
			align-items: center;
			display: flex;
			justify-content: space-between;
			width: 100%;
		`,
	};

	const elementPreviewUrl = get( onecms, 'elementPreviewUrl', false );
	const credentials = get( onecms, 'elementPreviewCredentials', false );

	if ( ! elementPreviewUrl || ! credentials ) {
		return null;
	}

	return (
		<PluginPostStatusInfo>
			<div className={ styles.container }>
				{ isLoading && (
					<Disabled>
						<Button
							isBusy
							isPrimary
						>
							Loading…
						</Button>
					</Disabled>
				) }

				{ ! isLoading && (
					<Button
						isPrimary
						onClick={ async () => {
							setLoading( true );

							try {
								const data = await getBlockPreview();
								const form = createFormPoster();

								// Once we have the data, it needs to be encoded and POSTed to the front-end.
								const formData = {
									...credentials,
									payload: encodeURIComponent( jsonStringifySafe( data ) ),
								};

								form.postForm( elementPreviewUrl, formData, () => {}, 'wp-preview' );
							} catch ( error ) {
								createErrorNotice( `Block Preview: ${ error.message }` );
							} finally {
								setLoading( false );
							}
						} }
					>
						Preview
					</Button>
				) }
				<ClipboardButton
					isLink
					onCopy={ () => setHasCopied( true ) }
					onFinishCopy={ () => setHasCopied( false ) }
					text={ `${ document.location.origin }/wp-json/onecms/v1/preview/${ postId }` }
				>
					{ hasCopied ? 'Copied' : 'Copy preview link' }
				</ClipboardButton>
			</div>
		</PluginPostStatusInfo>
	);
};

registerPlugin( 'onecms-preview', { render: Preview } );
