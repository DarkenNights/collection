import dbConnect from '../../utils/dbConnect'
const VinylModel = require('../../models/Vinyl')
const GameModel = require('../../models/Game')
const BookModel = require('../../models/Book')
import { NextApiRequest, NextApiResponse } from 'next'
import * as fs from "fs";
import formidable from "formidable";
import slug from "slug";
// @ts-ignore
import Cors from "cors"
import initMiddleware from '../../middlewares/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

const add = async (req: NextApiRequest, res: NextApiResponse) => {
    // Run cors
    await cors(req, res)

    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            let fileExtension = '.jpg'
            if('originalFilename' in files.image && files.image.originalFilename)
                fileExtension = '.'+files.image.originalFilename.split('.')[files.image.originalFilename.split('.').length - 1]
            try {
                await dbConnect()
                switch (fields.type) {
                    case 'vinyl' :
                        const vinyl = new VinylModel({
                            title: fields.title,
                            image: '/images/vinyls/'+slug(<string>fields.title)+fileExtension,
                            description: fields.description,
                            command: fields.command
                        })
                        await vinyl.save()
                        await saveFile(files.image, vinyl.image);
                        break
                    case 'game' :
                        const game = new GameModel({
                            title: fields.title,
                            image: '/images/games/'+slug(<string>fields.title)+fileExtension,
                            description: fields.description,
                            command: fields.command
                        })
                        await game.save()
                        await saveFile(files.image, game.image);
                        break
                    case 'book' :
                        const book = new BookModel({
                            title: fields.title,
                            image: '/images/books/'+slug(<string>fields.title)+fileExtension,
                            description: fields.description,
                            command: fields.command
                        })
                        await book.save()
                        await saveFile(files.image, book.image);
                        break
                }
                return res.status(201).send("");
            } catch (err: any) {
                console.log(err.message)
                return res.status(500).send(err);
            }
        });
    } else {
        res.status(405).send('Method not allowed')
    }
}

const saveFile = async (file: any, filename: string) => {
    console.log(filename)
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(filename, data);
    await fs.unlinkSync(file.filepath);
    return;
};

export default add

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
