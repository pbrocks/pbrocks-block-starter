const el = wp.element.createElement;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;
 
const BLOCKS_TEMPLATE = [
    [ 'core/image', {} ],
    [ 'core/paragraph', { placeholder: 'Image Details' } ],
];
 
registerBlockType( 'myplugin/template', {
    title: 'My Template Block',
    category: 'widgets',
    edit: ( props ) => {
        return el( InnerBlocks, {
            template: BLOCKS_TEMPLATE,
            templateLock: false,
        } );
    },
    save: ( props ) => {
        return el( InnerBlocks.Content, {} );
    },
} );