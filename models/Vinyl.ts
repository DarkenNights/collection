import mongoose from 'mongoose'
import { VinylDocument } from '../types/models'

const vinylSchema = new mongoose.Schema<VinylDocument>(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        blur: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        command: {
            type: Boolean,
        },
    },
    {
        collection: 'vinyls',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

module.exports = mongoose.models.Vinyl || mongoose.model('Vinyl', vinylSchema)
