/**
 * WordPress dependencies
 */
import { PanelBody, SelectControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';

/**
 * External dependencies
 */
import { ExtensionSidebar, SortableList, TermSelectControl } from '@meredithcorp/onecms-components';
import { useMeta } from '@meredithcorp/onecms-utils';
import { get, uniq } from 'lodash';
import { useSelect } from '@wordpress/data';

/**
 * Adding a single term.
 *
 * @param {Object} term The value to add to the list.
 * @param {Object} originalData The data holding the original terms.
 * @param {Function} callback The function callback for updating terms.
 */
const addTerm = ( term, originalData, callback ) => {
	callback( uniq( [
		...originalData,
		term.id,
	] ) );
};

/**
 * Sidebar for OneCMS/Meredith-Metadata.
 *
 * @return {Object} The sidebar.
 */
const MeredithMetadataSidebar = () => {
	const [ contentLifecycle, updateContentLifecycle ] = useMeta( 'content_lifecycle' );
	const [ editorialAttribute, updateEditorialAttribute ] = useMeta( 'editorial_attributes' );
	const [ facebookOpinion, updateFacebookOpinion ] = useMeta( 'facebook_news_opinion' );
	const [ facebookBlacklist, updateFacebookBlacklist ] = useMeta( 'facebook_news_blacklist' );
	const [ keywords, updateKeywords ] = useMeta( 'keywords' );
	const [ primaryPurpose, updatePrimaryPurpose ] = useMeta( 'primary_purpose' );

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
				{ get( term, 'name', 'Loading...' ) }
			</div>
		);
	};

	/**
	 * Adding a single term for keywords.
	 *
	 * @param {Object} term The value to add to the list.
	 * @return {Object} The updated group.
	 */
	const addKeywordsTerm = ( term ) => addTerm( term, keywords, updateKeywords );

	/**
	 * Adding a single term for editorial attributes.
	 *
	 * @param {Object} term The value to add to the list.
	 * @return {Object} The updated group.
	 */
	const addEditorialAttributesTerm = ( term ) => addTerm( term, editorialAttribute, updateEditorialAttribute );

	return (
		<ExtensionSidebar
			icon="schedule"
			name="onecms-meredith-metadata"
			title="Meredith Metadata"
		>
			<PanelBody initialOpen={ true } >
				<SelectControl
					label="Primary Purpose"
					onChange={ ( value ) => updatePrimaryPurpose( value ) }
					options={ [
						{ label: 'Traffic & Acquisition', value: 'traffic-and-acquisition' },
						{ label: 'Retention & Engagement', value: 'retention-and-engagement' },
						{ label: 'Consumer Revenue', value: 'consumer-revenue' },
						{ label: 'Brand', value: 'brand' },
						{ label: 'Sponsored', value: 'sponsored' },
					] }
					value={ primaryPurpose }
				/>
				<SelectControl
					label="Content Lifecycle"
					onChange={ ( value ) => updateContentLifecycle( value ) }
					options={ [
						{ label: 'Evergreen - Annual', value: 'evergreen-annual' },
						{ label: 'Evergreen - Seasonal', value: 'evergreen-seasonal' },
						{ label: 'Episodic - News/Social', value: 'episodic-news-social' },
						{ label: 'None', value: 'none' },
					] }
					value={ contentLifecycle }
				/>
				<SelectControl
					label="Is this article opinion?"
					onChange={ ( value ) => updateFacebookOpinion( value ) }
					options={ [
						{ label: 'No', value: false },
						{ label: 'Yes', value: true },
					] }
					value={ facebookOpinion }
				/>
				<SelectControl
					label="Blacklist this article from the Facebook news feed?"
					onChange={ ( value ) => updateFacebookBlacklist( value ) }
					options={ [
						{ label: 'No', value: false },
						{ label: 'Yes', value: true },
					] }
					value={ facebookBlacklist }
				/>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title="Keywords"
			>
				<SortableList
					items={ keywords }
					onChange={ ( items ) => updateKeywords( items ) }
					renderItem={ ( { item } ) => (
						<Term
							id={ item }
							taxonomy="keyword"
						/>
					) }
				/>
				<TermSelectControl
					label="Add a keyword"
					onChange={ ( value ) => addKeywordsTerm( value ) }
					taxonomy="keyword"
				/>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title="Editorial Attributes"
			>
				<SortableList
					items={ editorialAttribute }
					onChange={ ( items ) => updateEditorialAttribute( items ) }
					renderItem={ ( { item } ) => (
						<Term
							id={ item }
							taxonomy="editorial_attribute"
						/>
					) }
				/>
				<TermSelectControl
					label="Add an editorial attribute"
					onChange={ ( value ) => addEditorialAttributesTerm( value ) }
					taxonomy="editorial_attribute"
				/>
			</PanelBody>
		</ExtensionSidebar>
	);
};

registerPlugin( 'onecms-meredith-metadata', { render: MeredithMetadataSidebar } );
