// Automatically register all base components in the UI directory

export default {
  install: (app, options) => {
    const allBaseComponents = require.context(
      '@/components/UI',
      true,
      /Base[A-Z]\w+\.vue$/,
    );
    allBaseComponents.keys().forEach((fileName) => {
      const componentObject = allBaseComponents(fileName);
      if (fileName.match('.vue')) {
        app.component(fileName.replace(/(.*)\/|\.vue/g, ''), componentObject.default || componentObject);
      }
    });
  },
};
