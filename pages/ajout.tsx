import type { NextPage } from 'next'
import {ChangeEvent, useState} from "react";
import {AddSaleForm} from "../types/api";
import axios from "axios";
import AWS from '../utils/AWS'

const Add: NextPage = () => {
    const [fields, setFields] = useState<AddSaleForm>({
        type: 'vinyls',
        title: '',
        description: '',
        command: 'false',
        image: ''
    })
    const [image, setImage] = useState<File>();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const imageURL = await AWS.uploadFile(image, fields.type)
        setFields({...fields, image: imageURL})
        const data = {
            type: fields.type,
            title: fields.title,
            description: fields.description,
            command: fields.command,
            image: fields.image
        };
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        console.log(data)
        await axios.post(process.env.NEXT_PUBLIC_VERCEL_URL + '/api/add', data, axiosConfig)
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
                            <label htmlFor="command" className="form-label">Quel type de produit ?</label>
                            <select className="form-select" aria-label="Default select example" name="type" onChange={handleChange}>
                                <option value="vinyls">Vinyles</option>
                                <option value="games">Jeux video</option>
                                <option value="books">Livres</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Nom du produit</label>
                            <input type="text" className="form-control" id="title" name="title" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image du produit</label>
                            <input className="form-control" type="file" id="image" name="image" onChange={handleImage} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="command" className="form-label">Est-ce une commande ?</label>
                            <select className="form-select" aria-label="Default select example" name="command">
                                <option value="true">Oui</option>
                                <option value="false">Non</option>
                            </select>
                        </div>
                        <button className="col-12 btn btn-dark" type="submit">Ajouter l&apos;achat</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Add
