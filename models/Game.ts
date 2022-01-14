import mongoose from 'mongoose'
import { GameDocument } from '../types/models'

const gameSchema = new mongoose.Schema<GameDocument>(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        precommand: {
            type: Boolean,
        },
    },
    {
        collection: 'games',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema)
