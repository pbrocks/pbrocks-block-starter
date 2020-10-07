/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

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
	} = props;

	const [ term, setTerm ] = useState( {} );

	useEffect( () => {
		apiFetch( { path: `/onecms/v1/term/${ id }` } ).then( ( result ) => {
			setTerm( result );
		} );
	}, [ id ] );

	return (
		<div>
			{ get( term, 'name', get( term, 'name', 'Loading...' ) ) }
		</div>
	);
};

export default Term;
