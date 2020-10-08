/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import { PluginPostStatusInfo } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import { css } from 'emotion';
import { useMeta } from '@meredithcorp/onecms-utils';

const styles = {
	container: css`
		align-items: center;
		display: flex;
		justify-content: space-between;
		width: 100%;
	`,
};

/**
 * Link back to term.
 *
 * @return {Object} A component to link back to the term.
 */
const TermLink = () => {
	const postType = useSelect( ( select ) => select( 'core/editor' ).getCurrentPostType() );
	const isAggregatePage = ( postType === 'category-page' );

	const [ primaryCategoryId ] = useMeta( 'primary_category' );
	const { categoryMetadata, isRequesting } = useSelect( ( select ) => {
		// Using isResolving to make sure we have the data before trying to show it.
		return {
			categoryMetadata: select( 'core' ).getEntityRecord( 'taxonomy', 'category', primaryCategoryId ),
			isRequesting: select( 'core/data' ).isResolving( 'core', 'getEntityRecord', [ 'taxonomy', 'category', primaryCategoryId ] ),
		};
	} );

	// Early return if not aggregate page.
	if ( ! isAggregatePage ) {
		return null;
	}

	if ( isRequesting ) {
		return (
			<>
				Loading information...
				<Spinner />
			</>
		);
	}

	const termEditUrl = addQueryArgs( '/wp-admin/term.php', {
		taxonomy: categoryMetadata.taxonomy,
		tag_ID: primaryCategoryId,
		post_type: 'post',
	} );

	// Uppercase the first letter.
	const taxType = categoryMetadata.taxonomy.charAt( 0 ).toUpperCase() + categoryMetadata.taxonomy.slice( 1 );

	return (
		<PluginPostStatusInfo>
			<div className={ styles.container }>
				<span>{ taxType } Term</span>
				<a href={ termEditUrl }>{ categoryMetadata.name }</a>
			</div>
		</PluginPostStatusInfo>
	);
};

registerPlugin( 'onecms-term-link', { render: TermLink } );

