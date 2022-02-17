/**
 * Block dependencies
 */
import icon from "./icon";
import Edit from "./edit";

/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Register block
 */
export default registerBlockType("block-starter/with-global-settings", {
  title: __("With Global Settings", "block-starter"),
  description: __(
    "Example block with global block settings",
    "block-starter"
  ),
  category: "block-starter",
  icon: {
    src: icon
  },
  keywords: [__( "API Key", "block-starter" )],
  edit: props => {
    return <Edit {...props} />;
  },
  save: props => {
    return <p>{__("Show block global settings", "block-starter")}</p>;
  }
});
