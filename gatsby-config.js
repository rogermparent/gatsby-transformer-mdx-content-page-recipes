const makeRecipeFieldData = require("./make-recipe-field-data")

const adjustTypeDefinition = ({originalDefinition}) => ({
  ...originalDefinition,
  fields: {
    ...originalDefinition.fields,
    name: `String`,
    ingredients: `[RecipeIngredientListEntry]`,
    yield: `SplitNumberString`,
  },
  interfaces: [...originalDefinition.interfaces, `Recipe`]
})

module.exports = (pluginOptions) => ({
  plugins: [
    `gatsby-interface-recipes`,
    `gatsby-interface-content-pages`,
    {
      resolve: 'gatsby-transformer-mdx-content-pages',
      options: {
        contentDirectory: `recipes`,
        typeName: `MdxRecipe`,
        defaultTemplate: `recipe`,
        adjustFieldData: makeRecipeFieldData,
        adjustTypeDefinition,
        ...pluginOptions
      },
    }
  ]
})
