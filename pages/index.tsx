import type { NextPage } from 'next'
import Vinyl from '../components/Vinyl'
import Game from '../components/Game'
import { IoGameController } from 'react-icons/io5'
import { BsVinylFill } from 'react-icons/bs'
import { ImBook } from 'react-icons/im'
import Book from '../components/Book'
import { GetStaticProps } from 'next'
import { IndexPage } from '../types/pages'
import { BookDocument, GameDocument, VinylDocument } from '../types/models'
import dbConnect from "../utils/dbConnect";
const GameModel = require("../models/Game");
const BookModel = require("../models/Book");
const VinylModel = require("../models/Vinyl");

const Index: NextPage<IndexPage> = ({ vinyls, games, books }) => {
    return (
        <>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 fw-normal">Pop Universe Collection</h1>
                    <p className="lead fw-normal">Vous permet d&apos;exposer votre collection à la vue de tous.</p>
                </div>
            </div>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <BsVinylFill size={'7em'} />
                    <h1 className="display-5 fw-bold">Vinyles commandés</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {vinyls.map((vinyl, index) => (
                            <Vinyl vinyl={vinyl} key={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <IoGameController size={'7em'} />
                    <h1 className="display-5 fw-bold">Jeux vidéo commandés</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {games.map((game, index) => (
                            <Game game={game} key={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <ImBook size={'7em'} />
                    <h1 className="display-5 fw-bold">Livres commandés</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {books.map((book, index) => (
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

    const gamesResult = await GameModel.find({command: true})
    const games: GameDocument[] = gamesResult.map((game: GameDocument) => {
        return JSON.parse(JSON.stringify(game))
    })

    const booksResult = await BookModel.find({command: true})
    const books: BookDocument[] = booksResult.map((book: BookDocument) => {
        return JSON.parse(JSON.stringify(book))
    })

    const vinylsResult = await VinylModel.find({command: true})
    const vinyls: VinylDocument[] = vinylsResult.map((vinyl: VinylDocument) => {
        return JSON.parse(JSON.stringify(vinyl))
    })

    return {
        props: {
            vinyls,
            games,
            books
        },
    }
}

export default Index
