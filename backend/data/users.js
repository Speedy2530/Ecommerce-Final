import bcrypt from 'bcryptjs'; //hashes user password (makes it hashtag symbols)

const users = [
    {
        name: 'Saihej Singh',
        email: 'bla@gmail.com',
        password: bcrypt.hashSync('123456', 10), //plaintext password bad idea, bcrypt replaces
        idAdmin: true,
    },
    {
        name: 'Sukhmani Sharma',
        email: 'sukh@gmail.com',
        password: bcrypt.hashSync('123456', 10), //plaintext password bad idea, bcrypt replaces
        idAdmin: false,
    },
    {
        name: 'hee hee',
        email: 'heehee@gmail.com',
        password: bcrypt.hashSync('123456', 10), //plaintext password bad idea, bcrypt replaces
        idAdmin: false,
    }
]

export default users;