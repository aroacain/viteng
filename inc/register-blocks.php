<?php
// BLOCKS by Aroa Cain

// Remember to add editor-styles support on theme_features
// Placeholder Block constructor function
class PlaceholderBlock {
  function __construct($name) {
    $this->name = $name;
    add_action('init', [$this, 'onInit']);
  }

  function ourRenderCallback($attributes, $content) {
    ob_start();
    require get_theme_file_path("/custom-blocks/{$this->name}.php");
    return ob_get_clean();
  }

  function onInit() {
    wp_register_script($this->name, get_stylesheet_directory_uri() . "/custom-blocks/{$this->name}.js", array('wp-blocks', 'wp-editor'));
    
    register_block_type("customblocktheme/{$this->name}", array(
      'editor_script' => $this->name,
      'render_callback' => [$this, 'ourRenderCallback']
    ));
  }
}

// Block constructor function
class JSXBlock {
  function __construct($name, $renderCallback = null, $data = null) {
    $this->name = $name;
    $this->data = $data;
    $this->renderCallback = $renderCallback;
    add_action('init', [$this, 'onInit']);
  }

  // Render callback. It needs the two parameters
  function ourRenderCallback($attributes, $content) {
    ob_start();
    require get_theme_file_path("/custom-blocks/{$this->name}.php");
    return ob_get_clean();
  }

  function onInit() {
    wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));
    
    // Passing the data which includes the fallback image
    if ($this->data) {
      // First arg: script we are trying to hook to
      // Second arg: name for the variable outputted
      // Third arg: value to be outputted
      wp_localize_script($this->name, $this->name, $this->data);
    }

    $ourArgs = array(
      'editor_script' => $this->name
    );

    //Check if we are doing a render callback
    // If yes, push another property into the array of arguments
    if ($this->renderCallback) {
      $ourArgs['render_callback'] = [$this, 'ourRenderCallback'];
    }

    register_block_type("customblocktheme/{$this->name}", $ourArgs);
  }
}

// Create custom block category
function our_block_categories( $categories ) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'our-custom-blocks',
                'title' => __( 'Our Custom Blocks', 'our-custom-blocks-boilerplate' ),
            ],
        ]
    );
}
add_action( 'block_categories', 'our_block_categories', 10, 2 );

// Restrict blocks allowed on blog post editor
function myallowedblocks($allowed_block_types, $editor_context) {
  // If you are on a post/page editor screen
  if (!empty($editor_context->post)) {
    return $allowed_block_types;
  }

  // if you are on the FSE screen, only allow these post types
  return array('ourblocktheme/header', 'ourblocktheme/footer');

}

// Uncomment the line below if you actually want to restrict which block types are allowed
//add_filter('allowed_block_types_all', 'myallowedblocks', 10, 2);

// REGISTER BLOCKS

// Register each new block with the constructor function
// PlaceholderBlock is not editable from the editor. Use for content attached to listings.
// JSXBlock is editable from the editor. 
// For the second paramenter, true if it uses a php render callback or false if it's pure JSX
// Defining theme_file_uri allows us to hardcode a fall back value for the background of the slides
// Make sure these fallback images ship with the theme

new PlaceholderBlock("name");
new JSXBlock("anothername", true, ['fallbackimage' => get_theme_file_uri('/assets/images/sample-map.jpg')]);