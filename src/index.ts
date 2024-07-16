console.log('hello world')

interface Person {
    name: string
    lastName: string
}

const person: Person = {
    name: 'John',
    lastName: 'Doe'
}

console.log(`hello world from ${person.name} ${person.lastName}!`)