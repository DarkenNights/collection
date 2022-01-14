import styles from '../styles/pages/Vinyles.module.scss'
import type { NextPage } from 'next'
import Vinyl from '../components/Vinyl'
import { BsVinylFill } from 'react-icons/bs'
import { GetStaticProps } from 'next'
import { VinylesPage } from '../types/pages'
import { VinylDocument } from '../types/models'
import SearchBar from '../components/SearchBar'
import { ChangeEvent, useEffect, useState } from 'react'
import dbConnect from '../utils/dbConnect'
const VinylModel = require('../models/Vinyl')

const Vinyles: NextPage<VinylesPage> = ({ vinyls }) => {
    const [vinylsDisplay, setVinylsDisplay] = useState<VinylDocument[]>(vinyls)
    const [text, setText] = useState<string>('')

    useEffect(() => {
        let filteredVinyls = [...vinyls]
        filteredVinyls = filteredVinyls.filter((book) => {
            const title = book.title.toLowerCase()
            const search = text.toLowerCase()
            return title.includes(search)
        })
        setVinylsDisplay(filteredVinyls)
    }, [text, vinyls])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    return (
        <>
            <div className="album py-5 bg-light">
                <div className="px-4 mb-5 text-center">
                    <BsVinylFill size={'7em'} />
                    <h1 className="display-5 fw-bold">Vinyles</h1>
                </div>
                <div className={styles['searchbar-container'] + ' ' + 'mb-5'}>
                    <SearchBar placeholder="Recherchez un produit" handleChange={handleChange} />
                </div>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {vinylsDisplay.map((vinyl, index) => (
                            <Vinyl vinyl={vinyl} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    await dbConnect()
    const vinylsResult = await VinylModel.find({})
    const vinyls: VinylDocument[] = vinylsResult.map((vinyl: VinylDocument) => {
        return JSON.parse(JSON.stringify(vinyl))
    })

    return {
        props: {
            vinyls,
        },
    }
}

export default Vinyles
