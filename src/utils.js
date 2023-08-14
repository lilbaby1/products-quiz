import _ from "lodash"
import { keywords } from "./data"

export const mapToKeywords = (array) => {
  const arr1 = array.flat()
  const arr2 = []

  arr1.forEach((element) => {
    if (keywords[element]) {
      arr2.push(keywords[element])
    } else {
      arr2.push(element)
    }
  })

  return arr2.flat()
}

export const getProductRecommendations = (keywordList, products) => {
  // Filter products based on the keywords
  const filteredProducts = _.filter(products, (product) => {
    return _.some(keywordList, (keyword) => {
      return (
        _.includes(product.title.toLowerCase(), keyword.toLowerCase()) ||
        _.some(product.tags, (tag) =>
          _.includes(tag.toLowerCase(), keyword.toLowerCase())
        ) ||
        _.includes(product.body_html.toLowerCase(), keyword.toLowerCase())
      )
    })
  })

  // Sort products based on the number of matching keywords (most to least)
  const sortedProducts = _.orderBy(filteredProducts, (product) => {
    const matchingKeywords = keywordList.filter((keyword) => {
      return (
        _.includes(product.title.toLowerCase(), keyword.toLowerCase()) ||
        _.some(product.tags, (tag) =>
          _.includes(tag.toLowerCase(), keyword.toLowerCase())
        ) ||
        _.includes(product.body_html.toLowerCase(), keyword.toLowerCase())
      )
    })
    return -matchingKeywords.length // Negative sign for descending order
  })

  return sortedProducts
}
