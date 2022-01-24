import { NextPage } from 'next'
import Image from 'next/image'
import { IoGameController, IoHome } from 'react-icons/io5'
import { BsVinylFill } from 'react-icons/bs'
import { ImBook } from 'react-icons/im'
import Link from 'next/link'

const Header: NextPage = () => {
    return (
        <header>
            <div className="px-3 py-2 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link href="/" passHref>
                            <a className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                                <Image src={'/logo-white.svg'} layout="fixed" width={250} height={50} alt="Logo Pop Collection" />
                            </a>
                        </Link>
                        <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <li>
                                <Link href="/" passHref>
                                    <a className="nav-link text-white d-flex align-items-center">
                                        <IoHome />
                                        <span className="ms-1">Accueil</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/vinyles" passHref>
                                    <a className="nav-link text-white d-flex align-items-center">
                                        <BsVinylFill />
                                        <span className="ms-1">Vinyle</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/jeux-video" passHref>
                                    <a className="nav-link text-white d-flex align-items-center">
                                        <IoGameController />
                                        <span className="ms-1">Jeux vidéo</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/livres" passHref>
                                    <a className="nav-link text-white d-flex align-items-center">
                                        <ImBook />
                                        <span className="ms-1">Livres/BDs</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
