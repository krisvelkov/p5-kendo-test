export interface Product {
  id: number
  name: string
  category: string
  unitPrice: number
  unitsInStock: number
  discontinued: boolean
  firstOrderedOn: Date
}

const categories = ['Beverages', 'Condiments', 'Confections', 'Dairy', 'Grains', 'Produce', 'Seafood']

const names = [
  'Chai', 'Chang', 'Aniseed Syrup', 'Cajun Seasoning', 'Gumbo Mix', 'Boysenberry Spread',
  'Dried Pears', 'Cranberry Sauce', 'Kobe Niku', 'Ikura', 'Queso Cabrales', 'Queso Manchego',
  'Konbu', 'Tofu', 'Genen Shouyu', 'Pavlova', 'Alice Mutton', 'Carnarvon Tigers',
  'Teatime Biscuits', 'Marmalade', 'Scones', 'Gustaf\'s Knäckebröd', 'Tunnbröd', 'Guaraná',
  'Nougat Creme', 'Gumbär Gummibärchen', 'Schoggi Schokolade', 'Rössle Sauerkraut',
  'Thüringer Rostbratwurst', 'Nord-Ost Matjeshering', 'Gorgonzola Telino', 'Mascarpone Fabioli',
  'Geitost', 'Sasquatch Ale', 'Steeleye Stout', 'Inlagd Sill', 'Gravad Lax', 'Côte de Blaye',
  'Chartreuse Verte', 'Boston Crab Meat', 'Clam Chowder', 'Singaporean Fried Mee',
  'Ipoh Coffee', 'Gula Malacca', 'Rogede Sild', 'Spegesild', 'Zaanse Koeken', 'Chocolade',
  'Maxilaku', 'Valkoinen Suklaa',
]

// Deterministic sample data so sorting/filtering behaves the same on every load.
export const products: Product[] = names.map((name, i) => ({
  id: i + 1,
  name,
  category: categories[(i * 3) % categories.length],
  unitPrice: Math.round((((i * 37) % 90) + 4.5) * 100) / 100,
  unitsInStock: (i * 53) % 120,
  discontinued: i % 7 === 3,
  firstOrderedOn: new Date(2020 + (i % 5), (i * 5) % 12, ((i * 11) % 27) + 1),
}))
