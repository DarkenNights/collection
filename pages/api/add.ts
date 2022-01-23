import dbConnect from '../../utils/dbConnect'
const VinylModel = require('../../models/Vinyl')
const GameModel = require('../../models/Game')
const BookModel = require('../../models/Book')
import { NextApiRequest, NextApiResponse } from 'next'

const add = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        console.log(req.body);
        // const form = new formidable.IncomingForm();
        // form.parse(req, async function (err, fields, files) {
        //     let fileExtension = '.jpg'
        //     if('originalFilename' in files.image && files.image.originalFilename)
        //         fileExtension = '.'+files.image.originalFilename.split('.')[files.image.originalFilename.split('.').length - 1]
            try {
                await dbConnect()
                switch (req.body.type) {
                    case 'vinyl' :
                        const vinyl = new VinylModel({
                            title: req.body.title,
                            image: req.body.image,
                            description: req.body.description,
                            command: req.body.command
                        })
                        await vinyl.save()
                        break
                    case 'game' :
                        const game = new GameModel({
                            title: req.body.title,
                            image: req.body.image,
                            description: req.body.description,
                            command: req.body.command
                        })
                        await game.save()
                        // await saveFile(files.image, process.cwd()+'/public'+game.image);
                        break
                    case 'book' :
                        const book = new BookModel({
                            title: req.body.title,
                            image: req.body.image,
                            description: req.body.description,
                            command: req.body.command
                        })
                        await book.save()
                        // await saveFile(files.image, process.cwd()+'/public'+book.image);
                        break
                }
                return res.status(201).send("");
            } catch (err: any) {
                console.log(err.message)
                return res.status(500).send(err);
            }
        // });
    } else {
        res.status(405).send('Method not allowed')
    }
}

export default add
