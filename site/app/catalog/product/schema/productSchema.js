import { schema } from 'normalizr'

const Product = new schema.Entity('products', { idAttribute : 'id'})

export default Product
