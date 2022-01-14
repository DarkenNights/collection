import { BookDocument, GameDocument, VinylDocument } from './models'

export type IndexPage = {
    vinyl: VinylDocument
    game: GameDocument
    book: BookDocument
    book2: BookDocument
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
