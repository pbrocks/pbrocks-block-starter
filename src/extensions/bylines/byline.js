/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * The byline component.
 *
 * @param {Object} props The component props.
 * @return {Object} The individual byline.
 */
const Byline = ( props ) => {
	const {
		onChange,
		item,
	} = props;

	const author = useSelect( ( select ) => select( 'onecms/authors' ).getAuthor( item.id ) );

	const designator = [
		{
			label: 'Author',
			value: 'author',
		},
		{
			label: 'Photographer',
			value: 'photographer',
		},
		{
			label: 'Guest Author',
			value: 'guest-author',
		},
		{
			label: 'Stylist',
			value: 'stylist',
		},
		{
			label: 'Contributor',
			value: 'contributor',
		},
		{
			label: 'Designer',
			value: 'designer',
		},
		{
			label: 'Photo Editor',
			value: 'photo-editor',
		},
		{
			label: 'Reporter',
			value: 'reporter',
		},
		{
			label: 'Blogger',
			value: 'blogger',
		},
		{
			label: 'Celebrity',
			value: 'celebrity',
		},
		{
			label: 'Local Expert',
			value: 'local-expert',
		},
		{
			label: 'Travel Agent',
			value: 'travel-agent',
		},
		{
			label: 'Travel Guide',
			value: 'travel-guide',
		},
		{
			label: 'Weekend Getaway Author',
			value: 'weekend-getaway-author',
		},
	];

	return (
		<div>
			{ `${ get( author, 'name', '...' ) }` }
			<div>
				<SelectControl
					onChange={ onChange }
					options={ designator }
					value={ item.designation }
				/>
			</div>
		</div>
	);
};

export default Byline;
