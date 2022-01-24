import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { AddSaleForm } from '../types/api'
import AwsService from '../services/AwsService'
import axios from 'axios'
import imageCompression from 'browser-image-compression'

const Add: NextPage = () => {
    const [fields, setFields] = useState<AddSaleForm>({
        type: 'vinyls',
        title: '',
        description: '',
        command: 'false',
        password: '',
    })
    const [image, setImage] = useState<File | undefined>()

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value,
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (image && fields.password === process.env.NEXT_PUBLIC_PASSWORD) {
            const imageUrl = await AwsService.uploadFile(image, fields.type)
            const fileReader = new FileReader()
            fileReader.addEventListener('load', function () {
                const img = new Image()
                img.onload = async function () {
                    console.log(img.width)
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: img.width / 10,
                        useWebWorker: true,
                    }
                    const compressedFile = await imageCompression(image, options)
                    const blur = await imageCompression.getDataUrlFromFile(compressedFile)
                    const data = {
                        type: fields.type,
                        title: fields.title,
                        description: fields.description,
                        command: fields.command,
                        image: imageUrl,
                        blur,
                    }
                    await axios.post(process.env.NEXT_PUBLIC_VERCEL_URL + '/api/add', data, { headers: { 'Content-Type': 'application/json' } })
                    setFields({
                        ...fields,
                        title: '',
                        description: '',
                        command: 'false',
                    })
                }
                if (fileReader.result) {
                    if (typeof fileReader.result === 'string') {
                        img.src = fileReader.result
                    }
                }
            })
            fileReader.readAsDataURL(image)
        }
    }

    return (
        <>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 fw-normal">Ajout d&apos;un achat</h1>
                </div>
            </div>
            <div className="container p-4 bg-light">
                <div className="row">
                    <form className="col-12" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="command" className="form-label">
                                Quel type de produit ?
                            </label>
                            <select className="form-select" aria-label="Default select example" name="type" onChange={handleChange}>
                                <option value="vinyls">Vinyles</option>
                                <option value="games">Jeux video</option>
                                <option value="books">Livres</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Nom du produit
                            </label>
                            <input type="text" className="form-control" id="title" name="title" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Image du produit
                            </label>
                            <input className="form-control" type="file" id="image" name="image" onChange={handleImage} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea className="form-control" id="description" name="description" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="command" className="form-label">
                                Est-ce une commande ?
                            </label>
                            <select className="form-select" aria-label="Default select example" name="command">
                                <option value="true">Oui</option>
                                <option value="false">Non</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Mot de passe
                            </label>
                            <input type="text" className="form-control" id="password" name="password" onChange={handleChange} />
                        </div>
                        <button className="col-12 btn btn-dark" type="submit">
                            Ajouter l&apos;achat
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Add
