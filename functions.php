<?php

function ourtheme_files() {
    // Google Fonts
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    // Font Awesome
    wp_enqueue_style('font-awesome', '//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
    // Compiled js and css files
    wp_enqueue_script('main-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    wp_enqueue_style('our-main-styles', get_theme_file_uri('/build/index.css'), array(), null);
    }


add_action('wp_enqueue_scripts', 'ourtheme_files');

function ourtheme_features() {
    // Title tag
    add_theme_support('title-tag');
    // Footer locations
    register_nav_menu('headerMenuLocation', 'Header Menu Location');
    register_nav_menu('footerLocationLeft', 'Footer Location Left');
    register_nav_menu('footerLocationRight', 'Footer Location Right');
    }

add_action('after_setup_theme', 'ourtheme_features');