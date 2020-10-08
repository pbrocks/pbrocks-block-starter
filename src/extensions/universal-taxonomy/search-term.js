/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

/**
 * Search the term.
 *
 * @param {string} keyword The search keyword.
 * @param {Object} filter The search filter.
 *
 * @return {Object} The api data in the form of a promise.
 */
const searchTerms = ( keyword, filter ) => {
	const path = addQueryArgs(
		'/onecms-utag-search/v1/search',
		{
			search: keyword,
			filter,
		},
	);

	return apiFetch( { path } ).then( ( result ) => result.data );
};

export default searchTerms;
