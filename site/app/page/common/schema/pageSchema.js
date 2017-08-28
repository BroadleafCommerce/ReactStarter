import { schema, normalize } from 'normalizr'

const Page = new schema.Entity('pages', {
    idAttribute: 'id',
    pageFields: {PageField}
})
const PageField = new schema.Entity('pageFields', { idAttribute: 'id' })

console.log(normalize({
    id: -1,
    pageFields: {
        productTitle: 'test',
    }
}))

export default Page
