// Import the toolbar and buttons
// import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
// Import the rich text block type, and the WYSIWYG controls
import { RichText, BlockControls } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";

// Register the block type
registerBlockType("customblocktheme/genericheader", {
  title: "Custom - Generic Header",
  category: "our-custom-blocks",
  icon: "layout",
  // Can the block be used more than once
  useOnce: false,
  // Define the attributes that the user will have as options, the shape of our data
  attributes: {
    text: { type: "string" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

// Edit compoment function
// props will pass the attributes through the overall props object
function EditComponent(props) {
  //Function to handle changes to the block for example by typing something
  function handleTextChange(x) {
    props.setAttributes({ text: x });
  }

  return (
    <>
      {/* Leverage the WP Rich Text block limiting and changing the values */}
      <RichText
        withoutInteractiveFormatting={true}
        tagName="h2"
        className={`editor__headline`}
        value={props.attributes.text}
        onChange={handleTextChange}
      />
    </>
  );
}

function SaveComponent(props) {
  // Fuction to determine the tag for the headline depending on the selected size

  return (
    <RichText.Content
      tagName="h2"
      // Set the content that will be saved
      value={props.attributes.text}
    />
  );
}
