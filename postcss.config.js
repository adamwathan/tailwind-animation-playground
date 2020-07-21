const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./public/**/*.html'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    function(css) {
      let removing = false

      css.each(node => {
        if (node.type === 'comment' && node.toString() === '/* postcss start remove */') {
          removing = true
        } else if (node.type === 'comment' && node.toString() === '/* postcss end remove */') {
          removing = false
        }

        if (removing) {
          node.remove()
        }
      })
    },
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss, require('cssnano')] : []),
  ],
}
