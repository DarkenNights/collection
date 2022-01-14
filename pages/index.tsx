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

const Index: NextPage<IndexPage> = ({ vinyl, game, book, book2 }) => {
    return (
        <>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 fw-normal">Pop Universe Collection</h1>
                    <p className="lead fw-normal">Vous permet d'exposer votre collection à la vue de tous.</p>
                </div>
            </div>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <BsVinylFill size={'7em'} />
                    <h1 className="display-5 fw-bold">Vinyles</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        <Vinyl vinyl={vinyl} />
                        <Vinyl vinyl={vinyl} />
                        <Vinyl vinyl={vinyl} />
                        <Vinyl vinyl={vinyl} />
                        <Vinyl vinyl={vinyl} />
                    </div>
                </div>
            </div>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <IoGameController size={'7em'} />
                    <h1 className="display-5 fw-bold">Jeux vidéo</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        <Game game={game} />
                        <Game game={game} />
                        <Game game={game} />
                        <Game game={game} />
                        <Game game={game} />
                    </div>
                </div>
            </div>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <ImBook size={'7em'} />
                    <h1 className="display-5 fw-bold">Livres</h1>
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        <Book book={book} />
                        <Book book={book2} />
                        <Book book={book} />
                        <Book book={book2} />
                        <Book book={book} />
                        <Book book={book2} />
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const vinyl: VinylDocument = {
        image: '/images/vinyls/cuphead.jpg',
        title: 'Cuphead 2LP standard édition',
        description: '',
    }

    const game: GameDocument = {
        image: '/images/games/ratchet_and_clank.jpg',
        title: 'Ratchet & Clank : Rift Apart',
        description: '',
    }

    const book: BookDocument = {
        image: '/images/books/ori.jpg',
        title: 'Ori and the will of the wisp',
        description: '',
    }

    const book2: BookDocument = {
        image: '/images/books/wow.jpg',
        title: 'World of Warcraft',
        description: '',
    }

    return {
        props: {
            vinyl,
            game,
            book,
            book2,
        },
    }
}

export default Index
