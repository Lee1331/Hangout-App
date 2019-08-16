// module.exports = {
//     plugins: [
//       // ...
//         require('tailwindcss'),
//         require('autoprefixer'),
//       // ...
//     ]
// }

const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')  
const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
      tailwindcss('./tailwind.js'),
      cssnano({
        preset: 'default',
      }),
      purgecss({
        content: ['./**/*.html'],
        extractors: [
          {
            extractor: class TailwindExtractor {
              static extract(content){
                return content.match(/[A-z0-9-:\/]+/g) || []
              }
            },
            extensions: ['css', 'html']
          }
        ]
      }),
      autoprefixer
    ]
}