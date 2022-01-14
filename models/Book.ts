import mongoose from 'mongoose'
import { BookDocument } from '../types/models'

const bookSchema = new mongoose.Schema<BookDocument>(
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
        command: {
            type: Boolean,
        },
    },
    {
        collection: 'books',
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
)

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema)
