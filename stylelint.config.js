module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'selector-id-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'no-descending-specificity': null,
    'declaration-block-no-duplicate-properties': true,
  },
};
