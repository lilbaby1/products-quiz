import axios from "axios"

const productsApi = axios.create({
  baseURL: "https://jeval.com.au/collections/hair-care/products.json?page=1",
})

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // delay added as a demo to skeleton components
  const response = await productsApi.get()
  return response.data.products
}
