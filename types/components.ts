import { BookDocument, GameDocument, VinylDocument } from './models'
import { ChangeEvent } from 'react'

export type VinylComponent = {
    vinyl: VinylDocument
}

export type GameComponent = {
    game: GameDocument
}

export type BookComponent = {
    book: BookDocument
}

export type SearchBar = {
    placeholder?: string
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}
