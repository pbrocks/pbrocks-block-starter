/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { ExtensionSidebar, IfPostTypeSupports } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { useFieldValidation } from 'utils';

/**
 * Internal dependencies
 */
import Categories from './categories.js';
import ContentProperty from './content-property.js';
import EditorialPrograms from './editorial-programs.js';
import CreativeWork from './creative-work-taxonomy';

/**
 * Validation wrapper component. This is necessary because we should only be
 * running the validation hook if the post type supports this extension.
 *
 * @return {null} This component does not render anything.
 */
const Validation = () => {
	const [ primaryCategory ] = useMeta( 'primary_category' );

	useFieldValidation(
		'onecms-categories',
		[
			{
				field: 'primaryCategory',
				error: [
					{
						check: ( Number.isInteger( primaryCategory ) && primaryCategory > 0 ),
						message: 'You must select a primary category.',
					},
				],
			},
		],
	);

	return null;
};

/**
 * Sidebar for OneCMS categories.
 *
 * @return {Object} The sidebar containing fields.
 */
const CategorySidebar = () => (
	<>
		<IfPostTypeSupports features={ [ 'onecms-categories' ] }>
			<Validation />
		</IfPostTypeSupports>

		<ExtensionSidebar
			icon="forms"
			name="onecms-categories"
			title="OneCMS Categories"
		>
			<Categories />
			<EditorialPrograms />
			<ContentProperty />
			<CreativeWork />
		</ExtensionSidebar>
	</>
);

registerPlugin( 'onecms-categories', { render: CategorySidebar } );
