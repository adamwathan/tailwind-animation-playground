const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./public/index.html'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    plugin(
      function ({ addBase, addUtilities, theme, variants, e }) {
        const keyframesConfig = theme('keyframes')
        const keyframesStyles = Object.fromEntries(
          Object.entries(keyframesConfig).map(([name, keyframes]) => {
            return [`@keyframes ${name}`, keyframes]
          })
        )
        addBase(keyframesStyles)

        const animationConfig = theme('animation')
        const utilities = Object.fromEntries(
          Object.entries(animationConfig).map(([suffix, animation]) => {
            return [
              `.${e(`animate-${suffix}`)}`,
              {
                animation,
              },
            ]
          })
        )
        addUtilities(utilities, variants('animation'))
      },
      {
        theme: {
          animation: {
            spin: 'spin 1s linear infinite',
            pulse: 'pulse 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            fade: 'fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            bounce: 'bounce 1s infinite',
          },
          keyframes: {
            spin: {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' },
            },
            pulse: {
              '0%': { transform: 'scale(1)', opacity: '1' },
              '75%, 100%': { transform: 'scale(2)', opacity: '0' },
            },
            fade: {
              '0%, 100%': { opacity: '1' },
              '50%': { opacity: '.5' },
            },
            bounce: {
              '0%, 100%': {
                transform: 'translateY(-25%)',
                animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
              },
              '50%': {
                transform: 'translateY(0)',
                animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
              },
            },
          },
        },
      }
    ),
  ],
}
