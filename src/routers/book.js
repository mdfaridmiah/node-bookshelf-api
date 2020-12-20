const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const router = new express.Router()



// router.post('/books', async (req, res) => {
//     // console.log(req.body)
//     const book = new Book(req.body)
//     // book.save().then(() => {
//     //     res.status(201).send(book)
//     // }).catch((e) => {
//     //     res.status(400).send(e)
//     // })


//     try {
//         await book.save()
//         res.status(201).send(book)
//     } catch (e) {
//         res.status(400).send(e)
//     }

// })
router.get('/test', async (req, res) => {
    try {
         var a = {
             name: 'Md Akash',
             age: 25
         }

        res.send(a)
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/books', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        owner: req.user._id
    })
    try {
        await book.save()
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }

})


router.get('/books', async (req, res) => {
    try {
        const book = await Book.find({ })

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/mybooks', auth, async (req, res) => {
    try {
        await req.user.populate('mybooks').execPopulate()
        res.send(req.user.mybooks)
    } catch (e) {
        res.status(500).send()
    }
})



// router.get('/books', auth, async (req, res) => {
//     try {
//         await req.user.populate('mybooks').execPopulate()
//         res.send(req.user.mybooks)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


// router.get('/books/:id', async (req, res) => {
//     const _id = req.params.id

//     // Book.findById(_id).then((books) => {
//     //     if (!books) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(books)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })

//     try {
//         const book = await Book.findById(_id)

//         if (!book) {
//             return res.status(404).send()
//         }

//         res.send(book)
//     } catch (e) {
//         res.status(500).send()
//     }

// })

router.get('/books/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const book = await Book.findOne({ _id, owner: req.user._id })
        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})


// router.patch('/books/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['title', 'author', 'pubdate', 'rating']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {

//         // const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
//         const book = await Book.findById(req.params.id)
//         updates.forEach((update) => book[update] = req.body[update])
//         await book.save()
//         if (!book) {
//             return res.status(404).send()
//         }

//         res.send(book)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })



router.patch('/books/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'author', 'pubdate', 'rating']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const book = await Book.findOne({ _id: req.params.id, owner: req.user._id})
        
        if (!book) {
            return res.status(404).send()
        }

        updates.forEach((update) => book[update] = req.body[update])
        await book.save()
        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})


// router.delete('/books/:id', async (req, res) => {
//     try {
//         const book = await Book.findByIdAndDelete(req.params.id)

//         if (!book) {
//             res.status(404).send()
//         }

//         res.send(book)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


router.delete('/books/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!book) {
            res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router