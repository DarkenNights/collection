import { BookDocument, GameDocument, VinylDocument } from './models'

export type IndexPage = {
    vinyls: VinylDocument[]
    games: GameDocument[]
    books: BookDocument[]
}

export type VinylesPage = {
    vinyls: VinylDocument[]
}

export type LivresPage = {
    books: BookDocument[]
}

export type JeuxVideoPage = {
    games: GameDocument[]
}
