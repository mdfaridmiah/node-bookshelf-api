const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/book')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })


// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.get('/', (req, res) => {
    res.send("Hello to Book-shelf API")
})


// auto json to object
app.use(express.json())
// express - user router
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//==============================================

// JSON TOKEN:
// const jwt = require('jsonwebtoken')
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'SECRET11', { expiresIn: '7 days' })
//     console.log(token)  

//     const data = jwt.verify(token, 'SECRET11')
//     console.log(data)
// }
// myFunction()


// Relationship between two entities:
// const Book = require('./models/book')
// const User = require('./models/user')

// const main = async () => {
//     // const book = await Book.findById('5c2e505a3253e18a43e612e6')
//     // await book.populate('owner').execPopulate()
//     // console.log(book.owner)

//     const user = await User.findById('5fda13a96aee8939d8e932cd')
//     await user.populate('mybooks').execPopulate()
//     console.log(user.mybooks)
// }
// main()


// res data for req:
//  let A = { 
//      n: 10
//  }
//  A.toJSON = function(){
//         return {};
//         // return this
//  }
//  console.log((A))
//  console.log(JSON.stringify(A))

// spread : 
// var ob = {
//     a: 10,
//     b: 'str-object',
//     c: 'hello..'
// }
// var ob2 = {
//     a: 77567567,
//     bb: 'str-aaaaaaaa',
//     c: 'hello..'
// }
// var list  = {...ob,...ob2}
// console.log(list)


