# NFT Market Place Front-end

## Commands:

#### Project Setup and Compiles for Development
```
git clone https://github.com/FansChainOrg/market-place-front-end
git checkout [development branch]
# Prevent modifying package-lock.json
npm ci
npm run serve
```

#### Compiles and Minifies for Production
```
npm run build
```

#### Run Your Unit Tests
```
npm run test:unit
```

## Basic Folder Structure:
```
── public
│   ├── favicon.ico
│   ├── favicon.png
│   ├── index.html
├── src
│   ├── assets
│   	├── css
│   	├── font
│   	├── svg
│   ├── components
│   ├── locales
│   ├── router
│   ├── services
│   ├── store
│   ├── utils
│   ├── views
│   ├── App.vue
│   ├── main.js
├── tests
│   ├── e2e
│   ├── unit
├── .browserslistrc
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── babel.config.js
├── jest.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
├── stylelint.config.js
└── vue.config.js
```

*Reference:*
[Vue3 Realworld Example](https://github.com/mutoe/vue3-realworld-example-app)
[Beauty Vue.js Boilerplate](https://github.com/zmts/beauty-vuejs-boilerplate)

## Style Guide / Naming Convention:
`CSS class / id:` kebab case [e.g. two-words]

`JS variable / function:` lower camel case [e.g. twoWords]

`Vue component file / folder name:` upper camel case [e.g. TwoWords]

`Vue component's / UI's prop:` lower camel case in declaration [e.g. twoWords], kebab case in template / HTML [e.g. two-words]

`i18n's key:` snake case [e.g. two_words]

`Vue routing path:` kebab case [e.g. two-words]

`Vue routing name:` upper camel case [e.g. TwoWords]

`Asset name (e.g. image):` kebab case [e.g. two-words]

**Extra Recommanded Style**
- [Vue.js Official Style Guide](https://v3.vuejs.org/style-guide)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [StyleLint Config Standard Rules](https://github.com/stylelint/stylelint-config-standard/blob/master/index.js)

## VSCode Setting:

#### Require Extentsions
```
ext install octref.vetur
ext install stylelint.vscode-stylelint
ext install dbaeumer.vscode-eslint
```

```json
//setting.json
{
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
		"source.fixAll.stylelint": true
	},
	"editor.formatOnSave": false,				// Prevent conflicting to ESLint
}
```

## Recommanded Commit Guidelines (Optional):

#### Message Format
```
<type>: <subject>
<BLANK LINE>
<body> (optonal)
<BLANK LINE>
<footer> (optonal)
<BLANK LINE>
<signed-off-by>
```

#### Commit Type Example
* `feat:` Adding a new feature
* `fix:` Fixing a fix
* `docs:` Adding / Modifying documentat (e.g. README)
* `style:` Adding / Modifying CSS or code style
* `refactor:` Modifying a whole UI or component
* `perf:` Modifying the codes that improves performance
* `test:` Adding a new tests
* `chore:` Adding / Modifying the things that hard to classify 

*Reference:*
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0)
