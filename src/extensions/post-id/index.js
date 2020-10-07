/**
 * WordPress dependencies
 */
import { ClipboardButton } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Metadata for recipe component
 *
 * @return {Object} A component consisting of metadata that belongs to recipe.
 */
const PostId = () => {
	const [ hasCopied, setHasCopied ] = useState( false );
	const postId = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostAttribute( 'id' ) );

	return (
		<PluginPostStatusInfo>
			<span>Post ID</span>
			<div>
				{ `${ postId } ` }
				<ClipboardButton
					isLink
					onCopy={ () => setHasCopied( true ) }
					onFinishCopy={ () => setHasCopied( false ) }
					text={ postId }
				>
					{ hasCopied ? '(copied)' : '(copy)' }
				</ClipboardButton>
			</div>
		</PluginPostStatusInfo>
	);
};

registerPlugin( 'onecms-post-id', { render: PostId } );
