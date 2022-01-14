import { NextPage } from 'next'
import Image from 'next/image'
import { VinylComponent } from '../types/components'

const Vinyl: NextPage<VinylComponent> = ({ vinyl }) => {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <Image src={vinyl.image} layout="responsive" width={100} height={100} alt={vinyl.title} />
                <div className="card-body text-center">
                    <h2 className="fs-5 mb-0">{vinyl.title}</h2>
                    {vinyl.description && (
                        <>
                            <hr />
                            <p className="card-text text-start">{vinyl.description}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Vinyl
