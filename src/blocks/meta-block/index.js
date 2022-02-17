
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType( 'pbrocks-todo/meta-block', {
    title: 'Meta Block',
    icon: 'smiley',
    category: 'text',

    edit( { setAttributes, attributes } ) {
        const blockProps = useBlockProps();
        const postType = useSelect(
            ( select ) => select( 'core/editor' ).getCurrentPostType(),
            []
        );
        const [ meta, setMeta ] = useEntityProp(
            'postType',
            postType,
            'meta'
        );
        const metaFieldValue = meta['pbrocks_todo_list'];
        function updateMetaValue( newValue ) {
            setMeta( { ...meta, 'pbrocks_todo_list': newValue } );
        }

        return (
            <div { ...blockProps }>
                <TextControl
                    label="Meta Block Field"
                    value={ metaFieldValue }
                    onChange={ updateMetaValue }
                />
            </div>
        );
    },

    // No information saved to the block
    // Data is saved to post meta via the hook
    save() {
        return null;
    },
} );
