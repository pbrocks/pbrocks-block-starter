// Get the current post ID.
wp.data.select('core/editor').getCurrentPostId();

// Get the current post.
wp.data.select('core/editor').getCurrentPost();

// Get the edited post attribute `featured_media`.
wp.data.select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );

// Update the post title.
wp.data.dispatch( 'core/editor' ).editPost( {title: 'New'} );

// Toggle the publish sidebar.
wp.data.dispatch( 'core/edit-post' ).togglePublishSidebar();

// Trigger the autosave.
wp.data.dispatch( 'core/editor' ).autosave();

// Trigger post update.
wp.data.dispatch( 'core/editor' ).savePost();


wp.data.subscribe( () => {
	// Something in the store changed.
} );

/**
 * Show notice in editor if the title exceeds 10 characters.
 */
// Get the current title.
let title = wp.data.select( 'core/editor' ).getCurrentPostAttribute( 'title' );
wp.data.subscribe( () => {
	// Get the updated title.
	const newTitle = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'title' );

	// Check if title has been changed.
	if (title !== newTitle) {
		title = newTitle; // Update title with the new value so we don't trigger duplicate checks.
		if (title.length > 10 ) {
			// Create a warning notice with id `title_too_big`.
			wp.data.dispatch( 'core/notices' ).createWarningNotice( 'Title is too long', {
				id: 'title_too_big'
			} );
			return;
		}

		// Remove a warning notice with id `title_too_big`.
		wp.data.dispatch( 'core/notices' ).removeNotice( 'title_too_big' );
	}
} );


/**
 * Add a uuid attribute for all registered blocks.
 */
const { addFilter } = wp.hooks;

function addAttributes( settings ) {
	//check if object exists for old Gutenberg version compatibility.
	if ( 'undefined' !== typeof settings.attributes ){
		// Add the uuid attribute for all block types.
		settings.attributes = Object.assign( settings.attributes, {
			uuid:{
				type: 'string',
				default: false,
			}
		} );
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'my/customNamespace',
	addAttributes
);

const { subscribe, select, dispatch } = wp.data;

let canUpdate = false;
const onPostUpdateSuccessListener = ( listener ) => {
	let previousIsSaving = false;
	return () => {
		const isSaving = select( 'core/editor' ).isSavingPost();
		const isAutoSaving = select( 'core/editor' ).isAutosavingPost();
		const didSaveSucceed = select( 'core/editor' ).didPostSaveRequestSucceed();

		// If the post is not saving, is not auto saving and last save succeeded,
		// we can trigger our update listener
		if ( ! isSaving && previousIsSaving && ! isAutoSaving && didSaveSucceed ) {
			if ( canUpdate ) {
				listener();
			} else {
				canUpdate = true;
			}
		}

		previousIsSaving = isSaving;
	};
};

subscribe( onPostUpdateSuccessListener( () => {
	const clientIds = [];
	select( 'core/editor' ).getBlocks().forEach( block => {
		if ( ! block.attributes.uuid ) {
			clientIds.push( block.clientId );
		}
	} );

	if ( clientIds.length ) {
		canUpdate = false; // stop recursion or update bubbling
		clientIds.forEach( clientId => {
			dispatch( 'core/editor' ).updateBlockAttributes( clientId, { uuid: clientId } );
		} );
		dispatch( 'core/editor' ).savePost();
	}
} ) );


/**
 * Register a custom store
 */
const { registerStore } = wp.data;

const DEFAULT_STATE = {
    items: [],
};

const actions = {
    addItem( item ) {
        return {
            type: 'ADD_ITEM',
            item
        };
    },

    removeItem( item ) {
        return {
			type: 'REMOVE_ITEM',
			item
        };
    }
};

const selectors = {
	getItems( state, item ) {
		const { items } = state;

		return [...items];
	}
};

registerStore( 'my-items', {
    reducer( state = DEFAULT_STATE, action ) {
        switch ( action.type ) {
            case 'ADD_ITEM':
                return {
                    ...state,
                    items: [
                        ...state.items,
                        action.item,
					],
                };

            case 'REMOVE_ITEM':
                return {
                    ...state,
                    items: state.items.filter( item => item.id !== action.item.id ),
                };
        }

        return state;
    },

    actions,
    selectors
} );

// Add items.
wp.data.dispatch( 'my-items' ).addItem( {id: 'asd'} );
wp.data.dispatch( 'my-items' ).addItem( {id: 'new'} );

// Remove item.
wp.data.dispatch( 'my-items' ).removeItem( {id: 'new'} );

// Get all items.
wp.data.select( 'my-items' ).getItems();


/**
 * Add a custom reducer to the `core/notices` store.
 */
const registry = wp.data.use(() => {}, {});

const defaultNoticeReducer = registry.stores['core/notices'].reducer;

const replaceNoticeReducer = ( state = {}, action ) => {
	if (action.type === 'CREATE_NOTICE' &&
		action.notice.id === 'SAVE_POST_NOTICE_ID' ) {
		state = {...state};
		const index = state.global.findIndex(n => n.id === action.notice.id);
		state.global[index].content = 'Post updated. See it in action!';
	}
	state.root = {
		...state.root,
		global: state.global,
	};
	return state;
};

// see https://stackoverflow.com/questions/48104778/how-does-reducereducers-work
function reduceReducers(...reducers) {
	return (previous, current) =>
		reducers.reduce(
			(p, r) => r(p, current),
			previous
		);
}

const reducers = reduceReducers(
	defaultNoticeReducer,
	replaceNoticeReducer,
);

registry.stores['core/notices'].store.replaceReducer(reducers);

