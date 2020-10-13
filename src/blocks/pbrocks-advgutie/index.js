// <------ Setting Up the Basic Block ------>
// <------------ index.js ------------>

/**
 * Block dependencies
 */
import icon from "./icon";
import Edit from "./edit";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
export default registerBlockType("pbrocks-block-starter/with-global-settings", {
  title: __("With Global Settings", "pbrocks-block-starter"),
  description: __(
    "Example block with global block settings",
    "pbrocks-block-starter"
  ),
  category: "pbrocks-block-starter",
  icon: {
    src: icon
  },
  keywords: [__("API Key", "pbrocks-block-starter")],
  edit: props => {
    return <Edit {...props} />;
  },
  save: props => {
    return <p>{__("Show block global settings", "pbrocks-block-starter")}</p>;
  }
});
