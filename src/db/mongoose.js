const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('../models/user')
const Book = require('../models/book')

dotenv.config()
// console.log(dotenv.config())
mongoose.connect(process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology:true
    },
    (error, client) => {
        if (error) {
            return console.log('Unable to connect to database!')
        }
        console.log('Connected to database!')
    }
)


// mongoose.connect('mongodb://127.0.0.1:27017/bookshelf-api-x', 
//     {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology:true
//     },
//     (error, client) => {
//         if (error) {
//             return console.log('Unable to connect to database!')
//         }

//     console.log('Connected to database!')
//     }
// )



// const user = new User(
//     {
//         name : 'Farid',
//         email: 'farid@gmail.com',
//         password: 'farid123'
//     }
//     )
//     user.save().then(() => {
//         console.log(user)
//     }).catch((e) => {
//         console.log("Error=>", e)
// })


// const book = new Book(
//     {
//         title: 'ABC-2',
//         author: 'Farid',
//         pubdate: '12-12-2001',
//         rating: 7
//     }
//     )
//     book.save().then(() => {
//         console.log(book)
//     }).catch((e) => {
//         console.log("Error=>", e)
// })




