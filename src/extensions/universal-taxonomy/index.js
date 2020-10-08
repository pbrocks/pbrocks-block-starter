/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import {
	BaseControl,
	Button,
	ExternalLink,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { dispatch, select } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import ExtendedTermSelectControl from './extended-term-select-control.js';

/**
 * External dependencies
 */
import { ExtensionSidebar, IfPostType, IfPostTypeSupports } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { useFieldValidation } from 'utils';
import { css } from 'emotion';
import { uniq, intersection } from 'lodash';

/**
 * Get Recommended Terms.
 *
 * @return {Object} Promise representing the API response.
 */
const getRecommendTerms = async () => {
	const { getEditedPostAttribute } = select( 'core/editor' );

	return apiFetch( {
		path: '/onecms/v1/utx/terms/recommend',
		method: 'POST',
		data: {
			title: getEditedPostAttribute( 'title' ),
			content: getEditedPostAttribute( 'content' ),
			meta: getEditedPostAttribute( 'meta' ),
		},
	} );
};

/**
 * Add a lists of terms.
 *
 * Note: Takes an array of terms, and adds a new value
 * while also deduping the terms by ID.
 *
 * @param {Array} terms The value to add to the list.
 * @param {Array} currentTerms The current list of terms.
 * @param {Function} update Callback for updating term.
 */
const addTerms = ( terms, currentTerms, update ) => {
	if ( ! Array.isArray( terms ) || terms.length === 0 ) {
		return;
	}

	dispatch( 'core/notices' ).removeNotice( 'MTAX_NOTICE' );

	// Term to be selected only once.
	const termIds = terms.map( ( item ) => {
		if ( currentTerms.includes( item.id ) ) {
			dispatch( 'core/notices' ).createErrorNotice( 'Term already used for this content', { id: 'MTAX_NOTICE', isDismissible: true } );

			return null;
		}

		return item.id;
	} ).filter( Boolean );

	update( uniq( [
		...currentTerms,
		...termIds,
	] ) );
};

/**
 * Filters universal terms.
 *
 * @param {Array} terms The value to add to the list.
 * @param {Array} currentTerms The current list of terms.
 * @param {Array} compareArray The terms list to compare with.
 * @param {Function} updateCompareArray Callback for updating universal terms.
 * @param {string} compareField The field for which term is selected.
 */
const filterTerms = ( terms, currentTerms, compareArray = [], updateCompareArray = '', compareField = '' ) => {
	if ( ! Array.isArray( compareArray ) || compareArray.length === 0 ) {
		return;
	}

	const termIds = terms.map( ( item ) => {
		return item.id;
	} );

	// Remove terms from General Taxonomy if present in Recipe Taxonomy - mainIngredient.
	const allTerms = uniq( [
		...currentTerms,
		...termIds,
	] );

	const found = intersection( allTerms, compareArray );

	const termsList = compareField === 'recipe' ? compareArray : allTerms;

	if ( found.length > 0 ) {
		const filtered = termsList.filter( ( item ) => ! found.includes( item ) );

		updateCompareArray( filtered );
	}
};

/**
 * Validation wrapper component. This is necessary because we should only be
 * running the validation hook if the post type supports this extension.
 *
 * @return {null} This component does not render anything.
 */
const Validation = () => {
	const [ universalTerms ] = useMeta( 'utag_ids' );
	const [ mainIngredient ] = useMeta( 'recipe_ingredient_utag_ids' );
	const [ recipeMealType ] = useMeta( 'recipe_meal_type_utag_ids' );
	const [ recipeCookingMethod ] = useMeta( 'recipe_cooking_method_utag_ids' );
	const [ recipeDishType ] = useMeta( 'recipe_dish_type_utag_ids' );

	const message = 'Must provide at least one MTAX term for each of the required categories: main ingredient(s), recipe dish type, recipe meal type, recipe cooking method.';

	const recipeFields = [
		{
			field: 'mainIngredient',
			error: [
				{
					message,
					check: ( Array.isArray( mainIngredient ) && mainIngredient.length > 0 ),
				},
			],
		},
		{
			field: 'recipeDishType',
			error: [
				{
					message,
					check: ( Array.isArray( recipeDishType ) && recipeDishType.length > 0 ),
				},
			],
		},
		{
			field: 'recipeCookingMethod',
			error: [
				{
					message,
					check: ( Array.isArray( recipeCookingMethod ) && recipeCookingMethod.length > 0 ),
				},
			],
		},
		{
			field: 'recipeMealType',
			error: [
				{
					message,
					check: ( Array.isArray( recipeMealType ) && recipeMealType.length > 0 ),
				},
			],
		},
	];

	const postType = wp.data.select( 'core/editor' ).getCurrentPostType();
	const recipeAppenders = ( postType === 'recipe' ) ? recipeFields : [];

	useFieldValidation(
		'onecms-universal-taxonomy',
		[
			{
				field: 'universalTerms',
				error: [
					{
						check: ( Array.isArray( universalTerms ) && universalTerms.length > 0 ),
						message: 'You must select a Universal Taxonomy term.',
					},
				],
			},
			...recipeAppenders,
		],
	);

	return null;
};

/**
 * Sidebar for OneCMS/Meredith Universal Taxonomy.
 *
 * @return {Object} The sidebar.
 */
const UniversalTaxonomySidebar = () => {
	const [ universalTerms, updateUniversalTerms ] = useMeta( 'utag_ids' );
	const [ mainIngredient, updateRecipeIngredient ] = useMeta( 'recipe_ingredient_utag_ids' );
	const [ recipeMealType, updateRecipeMealType ] = useMeta( 'recipe_meal_type_utag_ids' );
	const [ recipeDishType, updateRecipeDishType ] = useMeta( 'recipe_dish_type_utag_ids' );
	const [ recipeCookingMethod, updateCookingMethod ] = useMeta( 'recipe_cooking_method_utag_ids' );

	const buttonStyle = css`
		margin-top: 7px;
	`;

	const allRecipeTerms = [ ...mainIngredient, ...recipeMealType, ...recipeDishType, ...recipeCookingMethod ];

	return (
		<>
			<ExtensionSidebar
				icon="tag"
				name="onecms-universal-taxonomy"
				title="Meredith Taxonomy"
			>
				<IfPostType types={ [ 'recipe' ] }>
					<PanelBody
						initialOpen={ true }
						title="Choose Recipe Terms"
					>
						<BaseControl id="mainIngredient" label="Main Ingredient(s)">
							<ExtendedTermSelectControl
								filter={ { id: 11374 } }
								items={ mainIngredient }
								onChangeSortable={ ( items ) => updateRecipeIngredient( items ) }
								onChangeTerm={ ( value ) => {
									addTerms( [ value ], mainIngredient, updateRecipeIngredient );
									filterTerms( [ value ], mainIngredient, universalTerms, updateUniversalTerms, 'recipe' );
								} }
							/>
						</BaseControl>

						<BaseControl id="recipeMealType" label="Recipe Meal Type">
							<ExtendedTermSelectControl
								filter={ { id: 25281 } }
								items={ recipeMealType }
								onChangeSortable={ ( items ) => updateRecipeMealType( items ) }
								onChangeTerm={ ( value ) => {
									addTerms( [ value ], recipeMealType, updateRecipeMealType );
									filterTerms( [ value ], recipeMealType, universalTerms, updateUniversalTerms, 'recipe' );
								} }
							/>
						</BaseControl>

						<BaseControl id="recipeDishType" label="Recipe Dish Type">
							<ExtendedTermSelectControl
								filter={ { id: 11184 } }
								items={ recipeDishType }
								onChangeSortable={ ( items ) => updateRecipeDishType( items ) }
								onChangeTerm={ ( value ) => {
									addTerms( [ value ], recipeDishType, updateRecipeDishType );
									filterTerms( [ value ], recipeDishType, universalTerms, updateUniversalTerms, 'recipe' );
								} }
							/>
						</BaseControl>

						<BaseControl id="recipeCookingMethod" label="Recipe Cooking Method">
							<ExtendedTermSelectControl
								filter={ { id: 11252 } }
								items={ recipeCookingMethod }
								onChangeSortable={ ( items ) => updateCookingMethod( items ) }
								onChangeTerm={ ( value ) => {
									addTerms( [ value ], recipeCookingMethod, updateCookingMethod );
									filterTerms( [ value ], recipeCookingMethod, universalTerms, updateUniversalTerms, 'recipe' );
								} }
							/>
						</BaseControl>
					</PanelBody>
				</IfPostType>

				<PanelBody
					initialOpen={ true }
					title="Choose Terms"
				>

					<ExtendedTermSelectControl
						items={ universalTerms }
						onChangeSortable={ ( items ) => updateUniversalTerms( items ) }
						onChangeTerm={ ( value ) => {
							addTerms( [ value ], universalTerms, updateUniversalTerms );
							filterTerms( [ value ], universalTerms, allRecipeTerms, updateUniversalTerms, 'universal' );
						} }
					/>

					<Button
						className={ buttonStyle }
						isPrimary
						onClick={ async () => {
							try {
								const results = await getRecommendTerms();

								addTerms( results.terms, universalTerms, updateUniversalTerms );
							} catch ( error ) {
								dispatch( 'core/notices' ).createErrorNotice( 'Utx Recommended Terms: ' + error.message );
							}
						} }
					>
						Get Recommended Terms
					</Button>

					<PanelRow>
						<ExternalLink href="https://taxonomyexplorer.meredith.services/Home/TagExplorer">Explore all terms</ExternalLink>
					</PanelRow>
				</PanelBody>
			</ExtensionSidebar>
			<IfPostTypeSupports features={ [ 'onecms-universal-taxonomy' ] }>
				<Validation />
			</IfPostTypeSupports>
		</>
	);
};

registerPlugin( 'onecms-universal-taxonomy', { render: UniversalTaxonomySidebar } );
