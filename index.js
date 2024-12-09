const { fakerDE: faker } = require('@faker-js/faker');
let GetRandomData = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(), // before version 9.1.0, use userName()
        email: faker.internet.email(),
        password: faker.internet.password(),
       
    };
}
console.log(GetRandomData());