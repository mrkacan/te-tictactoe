module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:jsx-control-statements/recommended'],
  plugins: [
    'react',
    'jsx-control-statements',
  ],
  rules: {

    'no-debugger': 0,
    'no-await-in-loop': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'arrow-parens': 0,
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js'] }],
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_$',
        argsIgnorePattern: '^_',
      },
    ],
    'react/no-typos': 'off',
    'react/require-default-props': 'off',
    'jsx-control-statements/jsx-jcs-no-undef': 'off',
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'no-undef': 'error',
    'react/forbid-prop-types': 'off',
    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'constructor',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
  },
  parser: 'babel-eslint',
};
