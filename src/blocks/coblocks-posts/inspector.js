/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import GutterControl from '../../components/gutter-control/gutter-control';
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ENTER,
	SPACE,
} from '@wordpress/keycodes';
import {
	PanelBody,
	QueryControls,
	RadioControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		activeStyle,
		styleOptions,
		onUpdateStyle,
		setAttributes,
		onUserModifiedColumn,
		categoriesList,
		postCount,
		hasPosts,
		hasFeaturedImage,
		useUpdatedQueryControls,
	} = props;

	const {
		columns,
		displayPostContent,
		displayPostDate,
		excerptLength,
		imageSize,
		imageStyle,
		listPosition,
		order,
		orderBy,
		postFeedType,
		postsToShow,
		categories,
		categoryRelation,
	} = attributes;

	const isHorizontalStyle = ( 'horizontal' === activeStyle.name );

	const sizeOptions = [
		{
			value: 'small',
			label: /* translators: abbreviation for small size */ __( 'S', 'pbrocks-block-starter' ),
			tooltip: /* translators: label for small size option */ __( 'Small', 'pbrocks-block-starter' ),
		},
		{
			value: 'medium',
			label: /* translators: abbreviation for medium size */ __( 'M', 'pbrocks-block-starter' ),
			tooltip: /* translators: label for medium size option */ __( 'Medium', 'pbrocks-block-starter' ),
		},
		{
			value: 'large',
			label: /* translators: abbreviation for large size */ __( 'L', 'pbrocks-block-starter' ),
			tooltip: /* translators: label for large size option */ __( 'Large', 'pbrocks-block-starter' ),
		},
		{
			value: 'huge',
			label: /* translators: abbreviation for extra large size */ __( 'XL', 'pbrocks-block-starter' ),
			tooltip: /* translators: label for extra large size option */ __( 'Huge', 'pbrocks-block-starter' ),
		},
	];

	const imageStyleHorizontalOptions = [
		{
			value: 'square',
			label: __( 'Square', 'pbrocks-block-starter' ),
			tooltip: __( 'Square', 'pbrocks-block-starter' ),
		},
		{
			value: 'circle',
			label: __( 'Circle', 'pbrocks-block-starter' ),
			tooltip: __( 'Circle', 'pbrocks-block-starter' ),
		},
	];

	const imageStyleStackedOptions = [
		{
			value: 'square',
			label: __( 'Square', 'pbrocks-block-starter' ),
			tooltip: __( 'Square', 'pbrocks-block-starter' ),
		},
		{
			value: 'four-to-three',
			label: __( '4:3', 'pbrocks-block-starter' ),
			tooltip: __( '4:3 Aspect ratio', 'pbrocks-block-starter' ),
		},
		{
			value: 'sixteen-to-nine',
			label: __( '16:9', 'pbrocks-block-starter' ),
			tooltip: __( '16:9 Aspect ratio', 'pbrocks-block-starter' ),
		},
		{
			value: 'circle',
			label: __( 'Circle', 'pbrocks-block-starter' ),
			tooltip: __( 'Circle', 'pbrocks-block-starter' ),
		},
	];

	const columnsCountOnChange = ( selectedColumns ) => {
		setAttributes( { columns:
			( selectedColumns > postsToShow ) ? postsToShow : selectedColumns,
		} );
	};

	const postsCountOnChange = ( selectedPosts ) => {
		const changedAttributes = { postsToShow: selectedPosts };
		if ( columns > selectedPosts || ( selectedPosts === 1 && columns !== 1 ) ) {
			Object.assign( changedAttributes, { columns: selectedPosts } );
		}
		setAttributes( changedAttributes );
	};

	if ( isHorizontalStyle && columns > 2 ) {
		columnsCountOnChange( 2 );
	}

	const settings = (
		<PanelBody title={ __( 'Posts settings', 'pbrocks-block-starter' ) }>
			<>
				<ToggleControl
					label={ __( 'Post date', 'pbrocks-block-starter' ) }
					checked={ displayPostDate }
					help={
						displayPostDate
							? __( 'Showing the publish date.', 'pbrocks-block-starter' )
							: __( 'Toggle to show the publish date.', 'pbrocks-block-starter' )
					}
					onChange={ () => setAttributes( { displayPostDate: ! displayPostDate } ) }
				/>
				<ToggleControl
					label={ __( 'Post content', 'pbrocks-block-starter' ) }
					checked={ displayPostContent }
					help={
						displayPostContent
							? __( 'Showing the post content.', 'pbrocks-block-starter' )
							: __( 'Toggle to show the post content.', 'pbrocks-block-starter' )
					}
					onChange={ () => setAttributes( { displayPostContent: ! displayPostContent } ) }
				/>
				{ displayPostContent &&
					<RangeControl
						label={ __( 'Max words in content', 'pbrocks-block-starter' ) }
						value={ excerptLength }
						onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
						min={ 5 }
						max={ 75 }
					/>
				}
				<RangeControl
					label={ __( 'Columns', 'pbrocks-block-starter' ) }
					value={ columns }
					onChange={ ( value ) => {
						onUserModifiedColumn();
						columnsCountOnChange( value );
					} }
					min={ 1 }
					max={ isHorizontalStyle ? Math.min( 2, postCount ) : Math.min( 4, postCount ) }
					required
				/>
				{ attributes.columns >= 2 && <GutterControl { ...props } /> }
				{ hasFeaturedImage &&
					<OptionSelectorControl
						label={ __( 'Thumbnail style', 'pbrocks-block-starter' ) }
						options={ isHorizontalStyle ? imageStyleHorizontalOptions : imageStyleStackedOptions }
						currentOption={ imageStyle }
						onChange={ ( newImageStyle ) => setAttributes( { imageStyle: newImageStyle } ) }
					/>
				}
				{ isHorizontalStyle && hasFeaturedImage &&
					<OptionSelectorControl
						label={ __( 'Thumbnail size', 'pbrocks-block-starter' ) }
						options={ sizeOptions }
						currentOption={ imageSize }
						onChange={ ( newImageSize ) => setAttributes( { imageSize: newImageSize } ) }
					/>
				}

			</>
		</PanelBody>
	);

	const deprecatedQueryControls = (
		<QueryControls
			order={ order }
			orderBy={ orderBy }
			categoriesList={ categoriesList }
			selectedCategoryId={ attributes.categories }
			categorySuggestions={ categoriesList }
			selectedCategories={ attributes.categories }
			onOrderChange={ ( value ) => setAttributes( { order: value } ) }
			onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
			onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
		/>
	);

	const updatedQueryControls = () => {
		const categorySuggestions = categoriesList.reduce(
			( accumulator, category ) => ( {
				...accumulator,
				[ category.name ]: category,
			} ),
			{}
		);

		const suggestions = categoriesList.reduce(
			( accumulator, category ) => ( {
				...accumulator,
				[ category.name ]: category,
			} ),
			{}
		);

		return ( <QueryControls
			order={ order }
			orderBy={ orderBy }
			categorySuggestions={ categorySuggestions }
			selectedCategories={ attributes.categories }
			onOrderChange={ ( value ) => setAttributes( { order: value } ) }
			onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
			onCategoryChange={ ( tokens ) => {
				// Categories that are already will be objects, while new additions will be strings (the name).
				// allCategories nomalizes the array so that they are all objects.
				const allCategories = tokens.reduce( ( acc, curr ) => {
					if ( typeof curr === 'string' ) {
						const suggestedToken = suggestions[ curr ];

						if ( suggestedToken ) {
							acc.push( suggestedToken );
						}
					} else {
						acc.push( curr );
					}

					return acc;
				}, [] );
				setAttributes( { categories: allCategories } );
				if ( tokens.length < 2 ) {
					setAttributes( { categoryRelation: 'or' } );
				}
			} }
		/> );
	};

	const feedSettings = (
		<PanelBody title={ __( 'Feed settings', 'pbrocks-block-starter' ) } initialOpen={ ! hasPosts ? true : false }>
			<RadioControl
				selected={ postFeedType }
				options={ [
					{ label: __( 'My blog', 'pbrocks-block-starter' ), value: 'internal' },
					{ label: __( 'External feed', 'pbrocks-block-starter' ), value: 'external' },
				] }
				onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
			/>
			{ hasPosts || ( !! categories && categories?.length > 0 )
				? <>
					{ postFeedType === 'internal' &&
						useUpdatedQueryControls ? updatedQueryControls() : deprecatedQueryControls
					}
					{ categories && categories.length > 1 &&
						<RadioControl
							label={ __( 'Category relation', 'pbrocks-block-starter' ) }
							help={ __( 'The logical relationship between each category when there is more than one.', 'pbrocks-block-starter' ) }
							selected={ categoryRelation }
							options={ [
								{ label: __( 'Or', 'pbrocks-block-starter' ), value: 'or' },
								{ label: __( 'And', 'pbrocks-block-starter' ), value: 'and' },
							] }
							onChange={ ( value ) => setAttributes( { categoryRelation: value } ) }
						/>
					}
					<RangeControl
						label={ __( 'Number of posts', 'pbrocks-block-starter' ) }
						value={ postsToShow }
						onChange={ ( value ) => postsCountOnChange( value ) }
						min={ 1 }
						max={ 20 }
					/>
				</> : null }
		</PanelBody>
	);

	return (
		<>
			{ hasPosts
				? <PanelBody title={ __( 'Styles', 'pbrocks-block-starter' ) } initialOpen={ false }>
					<div className="block-editor-block-styles pbrocks-block-starter-editor-block-styles">
						{ styleOptions.map( ( style ) => (
							<div
								key={ `style-${ style.name }` }
								className={ classnames(
									'block-editor-block-styles__item',
									{
										'is-active': activeStyle === style,
									}
								) }
								onClick={ () => {
									if ( 'horizontal' === style.name && [ 'four-to-three', 'sixteen-to-nine' ].includes( imageStyle ) ) {
										setAttributes( { imageStyle: 'square' } );
									}
									onUpdateStyle( style );
								} }
								onKeyDown={ ( event ) => {
									if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
										event.preventDefault();
										onUpdateStyle( style );
									}
								} }
								role="button"
								tabIndex="0"
								aria-label={ style.label || style.name }
							>
								<div className="block-editor-block-styles__item-preview">
									{ listPosition === 'left' && style.iconAlt ? style.iconAlt : style.icon }
								</div>
								<div className="block-editor-block-styles__item-label">
									{ style.label || style.name }
								</div>
							</div>
						) ) }
					</div>
				</PanelBody> : null }
			{ hasPosts ? settings : null }
			{ feedSettings }
		</>
	);
};

export default Inspector;
