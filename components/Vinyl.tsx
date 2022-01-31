import { NextPage } from 'next'
import Image from 'next/image'
import { VinylComponent } from '../types/components'
import { FaShoppingCart } from 'react-icons/fa'

const Vinyl: NextPage<VinylComponent> = ({ vinyl }) => {
    return (
        <div className="col">
            <div className="card shadow-sm">
                <Image src={vinyl.image} layout="responsive" width={100} height={100} alt={vinyl.title} placeholder="blur" blurDataURL={vinyl.blur} />
                <div className="card-body text-center">
                    <h2 className="fs-5 mb-0 d-flex justify-content-center align-items-center">
                        {vinyl.command && <FaShoppingCart />}
                        <span className="ms-1">{vinyl.title}</span>
                    </h2>
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
