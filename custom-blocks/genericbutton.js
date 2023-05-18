// Import our custom color palette
import ourColors from "../inc/ourColors";
// Import the link icon. It might need to be installed with npm install @wordpress/icons
import { link } from "@wordpress/icons";
// Import popover and button
// PanelBody PanelRow ColorPalette for the color palette
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
  PanelBody,
  PanelRow,
  ColorPalette,
} from "@wordpress/components";
// Import link control for link picker
// InspectorControls for the settings bar for the color picker
// getColorObjectByColorValue gives the name of hex color
import {
  RichText,
  InspectorControls,
  BlockControls,
  __experimentalLinkControl as LinkControl,
  getColorObjectByColorValue,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
// Import element, WP version of react
import { useState } from "@wordpress/element";

// Register the block type
registerBlockType("customblocktheme/genericbutton", {
  title: "Custom - Generic Button",
  category: "our-custom-blocks",
  icon: "layout",
  attributes: {
    text: { type: "string" },
    // IMPORTANT: Provide a default value for the link object so the button can be saved even if nothing is selected
    linkObject: { type: "object", default: { url: "" } },
    //Color name as will be saved in the database
    colorName: { type: "string", default: "red" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  // Create a simple constant to remember if the link picker is visible
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

  function handleTextChange(x) {
    props.setAttributes({ text: x });
  }

  function buttonHandler() {
    setIsLinkPickerVisible((prev) => !prev);
  }

  // What will happen with the data provided by the object
  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink });
  }

  function handleColorChange(color) {
    props.setAttributes({ colorName: color });
  }

  return (
    <>
      <BlockControls>
        {/* Toolbar group for the link picker */}
        <ToolbarGroup>
          <ToolbarButton
            // What happens when they click it
            onClick={buttonHandler}
            // Link icon
            icon={link}
          />
        </ToolbarGroup>

        {/* Toolbar Group for color */}
        <ToolbarGroup>
          <ToolbarButton
            isPressed={props.attributes.colorName === "red"}
            onClick={() => props.setAttributes({ colorName: "red" })}
          >
            Red
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.colorName === "white"}
            onClick={() => props.setAttributes({ colorName: "white" })}
          >
            White
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.colorName === "black-white"}
            onClick={() => props.setAttributes({ colorName: "black-white" })}
          >
            White with outline
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.colorName === "gray"}
            onClick={() => props.setAttributes({ colorName: "gray" })}
          >
            Gray
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      {/* Add the section on the settings panel for the color picker */}
      <RichText
        // Disallow text formats such as bold
        allowedFormats={[]}
        // HTML tag
        tagName="a"
        // HTML classes dynamic so picking a color will change it in the editor preview
        className={`btn btn--large btn--${props.attributes.colorName}`}
        style={{ margin: "1rem 0" }}
        // Pull text attribute from props
        value={props.attributes.text}
        // Runs whenever someone changes something. Using a function here which was defined before
        onChange={handleTextChange}
      />

      {/* Check if link picker if visible, if so, do what is in parenthesis */}
      {isLinkPickerVisible && (
        <Popover
          // Set the position of the link picker
          position="middle center"
          // Hide it when the user clicks elsewhere on the screen
          onFocusOutside={() => setIsLinkPickerVisible(false)}
        >
          {/* Use link control */}
          <LinkControl
            // Provide any additional or custom settings
            settings={[]}
            // Value linked to object
            value={props.attributes.linkObject}
            // What will happen when something is entered here
            onChange={handleLinkChange}
          />
          {/* Button to close the popover */}
          <Button
            variant="primary"
            // Custom function that will make it invisible
            onClick={() => setIsLinkPickerVisible(false)}
            // Style of the button
            style={{ display: "block", width: "100%" }}
          >
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  );
}

function SaveComponent(props) {
  return (
    // What will be saved in the database
    <span className="btn--bottom-left ml-20">
      <a
        // Set the href value to the url stored in the linkObject
        href={props.attributes.linkObject.url}
        className={`btn btn--large btn--${props.attributes.colorName}`}
      >
        {props.attributes.text}
      </a>
    </span>
  );
}
