<nav class="navbar">
    <a href="#" class="navbar__logo">
        <img src="<?php echo get_theme_file_uri('/assets/img/logo.png') ?>" alt="Vitamin English Logo">
    </a>
    <div class="navbar__menu">
        <?php
              wp_nav_menu(array(
                'theme_location' => 'headerMenuLocation',
              ));
        ?>
    </div>
    <div class="navbar__menu-btn">
        <i class="fas fa-bars"></i>
    </div>
</nav>