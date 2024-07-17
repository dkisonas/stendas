<?php

/**
 * Plugin Name:       Stendas
 * Description:       Pluginas
 * Version:           2.0.0
 * Author:            Dominykas Kišonas
 */

require_once plugin_dir_path(__FILE__) . 'src/inc/webcam-email-handler.php';

function enqueue_stendas_plugin_scripts() {
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    wp_enqueue_script(
        'stendas-scripts',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );
}

add_action('wp_enqueue_scripts', 'enqueue_stendas_plugin_scripts');