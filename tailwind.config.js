const plugin = require('tailwindcss/plugin')

module.exports = {
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
            'stepped-spin': 'spin 1s steps(8) infinite',
            pulse: 'pulse 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            // fade: 'fade 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
            fade: 'fade 2s ease-in-out infinite',
            // fade: 'fade 2s linear infinite',
            wobble: 'wobble 1s ease-in-out infinite',
            'wiggle-up': 'wiggle-up 1s infinite',
            'wiggle-right': 'wiggle-right 1s infinite',
            'wiggle-down': 'wiggle-down 1s infinite',
            'wiggle-left': 'wiggle-left 1s infinite',
          },
          keyframes: {
            spin: {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' },
            },
            pulse: {
              '0%': { transform: 'scale(1)', opacity: '1' },
              // '50%': { opacity: '1' },
              '66%': { transform: 'scale(2)', opacity: '0' },
              '100%': { transform: 'scale(2)', opacity: '0' },
            },
            fade: {
              '0%': { opacity: '1' },
              '50%': { opacity: '.5' },
              '100%': { opacity: '1' },
            },
            wobble: {
              // '0%': { transform: 'rotate(0deg)' },
              '0%': { transform: 'rotate(-3deg)' },
              '50%': { transform: 'rotate(3deg)' },
              '100%': { transform: 'rotate(-3deg)' },
              // '100%': { transform: 'rotate(0deg)' },
            },
            'wiggle-up': {
              '0%': {
                transform: 'translateY(0)',
                animationTimingFunction: 'cubic-bezier(0.6, 0, 0.6, 1)',
              },
              '50%': {
                transform: 'translateY(.125rem)',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.4, 1)',
              },
              '100%': { transform: 'translateY(0)' },
            },
            'wiggle-right': {
              '0%': {
                transform: 'translateX(0)',
                animationTimingFunction: 'cubic-bezier(.6, 0, .6, 1)',
              },
              '40%': {
                transform: 'translateX(-.25rem)',
                animationTimingFunction: 'cubic-bezier(.4, 0, .4, 1)',
              },
              '80%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(0)' },
            },
            'wiggle-down': {
              '0%': {
                transform: 'translateY(0)',
                animationTimingFunction: 'cubic-bezier(0.6, 0, 0.6, 1)',
              },
              '50%': {
                transform: 'translateY(-.125rem)',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.4, 1)',
              },
              '100%': { transform: 'translateY(0)' },
            },
            'wiggle-left': {
              '0%': {
                transform: 'translateX(0)',
                animationTimingFunction: 'cubic-bezier(0.6, 0, 0.6, 1)',
              },
              '50%': {
                transform: 'translateX(.125rem)',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.4, 1)',
              },
              '100%': { transform: 'translateX(0)' },
            },
          },
        },
      }
    ),
  ],
}
