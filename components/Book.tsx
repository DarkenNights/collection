import { NextPage } from 'next'
import Image from 'next/image'
import { BookComponent } from '../types/components'

const Book: NextPage<BookComponent> = ({ book }) => {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <Image src={book.image} width={500} height={500} objectFit="contain" />
                <div className="card-body text-center">
                    <h2 className="fs-5 mb-0">{book.title}</h2>
                    {book.description && (
                        <>
                            <hr />
                            <p className="card-text text-start">{book.description}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Book
