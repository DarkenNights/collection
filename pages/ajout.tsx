import type { NextPage } from 'next'
import {ChangeEvent, useState} from "react";
import {AddSaleForm} from "../types/api";
import axios from "axios";

const Add: NextPage = () => {
    const [fields, setFields] = useState<AddSaleForm>({
        type: 'vinyl',
        title: '',
        description: '',
        command: 'false'
    })
    const [image, setImage] = useState<string | Blob>('');

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

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData();
        data.append('image', image)
        data.append('title', fields.title)
        data.append('type', fields.type)
        if(fields.description) data.append('description', fields.description)
        data.append('command', fields.command)
        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        return axios.post(process.env.NEXT_PUBLIC_VERCEL_URL + '/api/add', data, axiosConfig)
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
                                <option value="vinyl">Vinyles</option>
                                <option value="game">Jeux video</option>
                                <option value="book">Livres</option>
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
