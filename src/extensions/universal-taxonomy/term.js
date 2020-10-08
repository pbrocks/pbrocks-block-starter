/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { Button, Popover, BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * External dependencies
 */
import { get } from 'lodash';
import { css } from 'emotion';

/**
 * The IsArray helper function.
 *
 * @param {Array} array The array to be tested.
 * @return {boolean} Whether or not it meets both conditions.
 */
const isArray = ( array ) => {
	return Array.isArray( array ) && array.length > 0;
};

/**
 * The term popover.
 *
 * @param {Object} props The component props.
 * @return {Object} The individual item.
 */
const TermPopover = ( props ) => {
	const {
		term,
		setPopOverDisplay,
	} = props;

	const styles = {
		popover: css`
			padding: 5px;
		`,
	};

	return (
		<Popover onClose={ () => setPopOverDisplay( false ) }>
			<div className={ styles.popover }>
				<p><strong>Term</strong>: { `${ term.name } (${ term.id })` }</p>

				{ isArray( term.path ) && (
					<BaseControl
						help={ term.path.join( ' → ' ) }
						id="path"
						label="Path"
					/>
				) }

				{ ( typeof term.defintion !== 'undefined' ) && (
					<BaseControl
						help={ term.definition }
						id="definition"
						label="Definition"
					/>
				) }

				{ ( typeof term.use !== 'undefined' && term.use.length > 0 ) && (
					<BaseControl
						help={ term.use }
						id="usage"
						label="Usage"
					/>
				) }

				{ isArray( term.synonyms ) && (
					<BaseControl
						help={ term.synonyms.join( ', ' ) }
						id="synonyms"
						label="Synonyms"
					/>
				) }

				{ isArray( term.misspellings ) && (
					<BaseControl
						help={ term.misspellings.join( ', ' ) }
						id="misspellings"
						label="Misspellings"
					/>
				) }

				{ isArray( term.relations ) && (
					<BaseControl
						help={ term.relations.join( ', ' ) }
						id="relations"
						label="Related to"
					/>
				) }
			</div>
		</Popover>
	);
};

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

	const [ popOverDisplay, setPopOverDisplay ] = useState( false );

	const term = useSelect( ( select ) => select( 'onecms/universal-taxonomy' ).getTerm( id ) );

	return (
		<div>
			<Button onClick={ () => setPopOverDisplay( true ) }>
				{ get( term, 'name', 'Loading...' ) }
			</Button>

			{ popOverDisplay && (
				<TermPopover setPopOverDisplay={ setPopOverDisplay } term={ term } />
			) }
		</div>

	);
};

export default Term;
