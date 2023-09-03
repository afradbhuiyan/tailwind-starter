const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.sass('./src/scss/tailwind.scss', 'dist/css')
    .options({
        postCss: [ tailwindcss('./tailwind.config.js') ],
    });
    
mix.disableSuccessNotifications();