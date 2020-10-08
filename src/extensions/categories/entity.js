/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';

/**
 * External dependencies
 */
import { get } from 'lodash';
import { useGraphEntity } from 'utils';

/**
 * The entity component.
 *
 * @param {Object} props The component props.
 * @return {Object} The individual item.
 */
const Entity = ( props ) => {
	const {
		id,
	} = props;

	const {
		isLoading: isLoadingContentProperty,
		item: data,
	} = useGraphEntity( id, { followAll: 'udf' } );

	if ( isLoadingContentProperty ) {
		return (
			'Loading…'
		);
	}

	return (
		<div>
			<Button >
				{ get( data, 'udf.$title', isLoadingContentProperty ) }
			</Button>
		</div>
	);
};

export default Entity;
