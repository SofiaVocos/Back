import { faker } from '@faker-js/faker/locale/es'

export class ProductMocker {
    
    constructor(amount) {
        this.amount = amount;
    }
    
    createRandomProducts = (qty) => {
        const randomProducts = []
    
        for (let i = 0; i < this.amount; i++) {
            const randomProduct = {
                id: faker.datatype.uuid(),
                timestamp: faker.datatype.datetime(),
                title: faker.vehicle.bicycle(),
                price: faker.datatype.number({min: 1000, max: 10000}),
                description: faker.lorem.sentence(5),
                code: faker.datatype.hexadecimal(),
                image: faker.image.imageUrl(400,600,'bike', true),
                stock: faker.datatype.number({min: 10, max:100})
            }
            randomProducts.push(randomProduct);
        }
        return randomProducts;
    }
}
