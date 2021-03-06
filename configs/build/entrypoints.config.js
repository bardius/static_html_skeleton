import { nodeModulesPathAbsolute, srcPathAbsolute } from "./paths.config";

/*
 All available options & documentation from:
 https://webpack.js.org/consiguration/entry-context
 */
const entrypoints = {
    vendor: [`${srcPathAbsolute}bundles/vendor/index.js`],
    app: [`${srcPathAbsolute}bundles/app/index.js`, `${srcPathAbsolute}bundles/app/index.scss`]
};

export default entrypoints;
