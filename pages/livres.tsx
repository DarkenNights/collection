import type { NextPage } from 'next'
import { ImBook } from 'react-icons/im'
import Book from '../components/Book'
import { GetStaticProps } from 'next'
import { LivresPage } from '../types/pages'
import styles from '../styles/pages/Vinyles.module.scss'
import SearchBar from '../components/SearchBar'
import { ChangeEvent, useEffect, useState } from 'react'
import { BookDocument } from '../types/models'
import dbConnect from '../utils/dbConnect'
const BookModel = require('../models/Book')

const Livres: NextPage<LivresPage> = ({ books }) => {
    const [booksDisplay, setBooksDisplay] = useState<BookDocument[]>(books)
    const [text, setText] = useState<string>('')

    useEffect(() => {
        let filteredBooks = [...books]
        filteredBooks = filteredBooks.filter((book) => {
            const title = book.title.toLowerCase()
            const search = text.toLowerCase()
            return title.includes(search)
        })
        setBooksDisplay(filteredBooks)
    }, [text, books])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    return (
        <>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <ImBook size={'7em'} />
                    <h1 className="display-5 fw-bold">Livres</h1>
                </div>
                <div className={styles['searchbar-container'] + ' ' + 'mb-5'}>
                    <SearchBar placeholder="Recherchez un produit" handleChange={handleChange} />
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {booksDisplay.map((book, index) => (
                            <Book book={book} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    await dbConnect()
    const booksResult = await BookModel.find({})
    const books: BookDocument[] = booksResult.map((book: BookDocument) => {
        return JSON.parse(JSON.stringify(book))
    })

    return {
        props: {
            books,
        },
    }
}

export default Livres
