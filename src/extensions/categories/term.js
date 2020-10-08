/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * The term component.
 *
 * @param {Object} props The component props.
 * @return {Object} The individual item.
 */
const Term = ( props ) => {
	const {
		id,
		taxonomy,
	} = props;

	const term = useSelect( ( select ) => {
		const object = select( 'core' ).getEntityRecord( 'taxonomy', taxonomy, id );

		return typeof object !== 'undefined' ? object : '';
	}, null );

	return (
		<div>
			{ get( term, 'breadcrumb', get( term, 'name', 'Loading...' ) ) }
		</div>
	);
};

export default Term;
