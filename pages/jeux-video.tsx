import type { NextPage } from 'next'
import Game from '../components/Game'
import { IoGameController } from 'react-icons/io5'
import { GetStaticProps } from 'next'
import { JeuxVideoPage } from '../types/pages'
import styles from '../styles/pages/Vinyles.module.scss'
import SearchBar from '../components/SearchBar'
import { ChangeEvent, useEffect, useState } from 'react'
import dbConnect from '../utils/dbConnect'
import { GameDocument } from '../types/models'
const GameModel = require('../models/Game')

const JeuxVideo: NextPage<JeuxVideoPage> = ({ games }) => {
    const [gamesDisplay, setGamesDisplay] = useState<GameDocument[]>(games)
    const [text, setText] = useState<string>('')

    useEffect(() => {
        let filteredGames = [...games]
        filteredGames = filteredGames.filter((book) => {
            const title = book.title.toLowerCase()
            const search = text.toLowerCase()
            return title.includes(search)
        })
        setGamesDisplay(filteredGames)
    }, [text, games])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }
    return (
        <>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <IoGameController size={'7em'} />
                    <h1 className="display-5 fw-bold">Jeux vidéo</h1>
                </div>
                <div className={styles['searchbar-container'] + ' ' + 'mb-5'}>
                    <SearchBar placeholder="Recherchez un produit" handleChange={handleChange} />
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {gamesDisplay.map((game, index) => (
                            <Game game={game} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    await dbConnect()
    const gamesResult = await GameModel.find({}).sort('title')
    const games: GameDocument[] = gamesResult.map((game: GameDocument) => {
        return JSON.parse(JSON.stringify(game))
    })

    return {
        props: {
            games,
        },
        revalidate: 10,
    }
}

export default JeuxVideo
