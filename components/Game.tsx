import { NextPage } from 'next'
import Image from 'next/image'
import { GameComponent } from '../types/components'

const Game: NextPage<GameComponent> = ({ game }) => {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <Image src={game.image} layout="responsive" width={245} height={300} alt={game.title} />
                <div className="card-body text-center">
                    <h2 className="fs-5 mb-0">{game.title}</h2>
                    {game.description && (
                        <>
                            <hr />
                            <p className="card-text text-start">{game.description}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Game
