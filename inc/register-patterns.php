<?php
// BLOCKS

// Create custom pattern category

function ourCustomPatternsCategory() {
  register_block_pattern_category(
  'custompatterns',
  array (
    'label' => __('Our Custom Patterns', 'custompatterns')
  )
  );
}

add_action( 'init', 'ourCustomPatternsCategory');

// Register individual patterns

function ourCustomPatterns () {

  // Questions pattern
  register_block_pattern(
    'custompatterns/questions',
    array (
        'title' => 'Questions',
        'categories'    => [
            'custompatterns',
        ],
        'description' => 'Questions section',
        'content' => '<!-- wp:customblocktheme/questions -->
            <!-- wp:customblocktheme/headermedium {"text":"Questions"} -->
            <h2 class="wp-block-customblocktheme-headermedium typography__medium-header">Questions</h2>
            <!-- /wp:customblocktheme/headermedium -->

            <!-- wp:customblocktheme/genericbutton {"text":"Learn more"} -->
            <span class="wp-block-customblocktheme-genericbutton btn--bottom-left ml-20"><a href="" class="btn btn--large btn--red">Learn more</a></span>
            <!-- /wp:customblocktheme/genericbutton -->
            <!-- /wp:customblocktheme/questions -->',
    )
    );


}

add_action('init', 'ourCustomPatterns');