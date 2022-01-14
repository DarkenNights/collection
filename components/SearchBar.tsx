import Image from 'next/image'
import styles from '../styles/components/SearchBar.module.scss'
import { SearchBar } from '../types/components'
import { NextPage } from 'next'

const SearchBar: NextPage<SearchBar> = ({ placeholder, handleChange }) => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder={placeholder} onChange={handleChange} />
            <button type="submit">
                <Image src="/images/icons/search-white.svg" width={25} height={25} alt="Icone de recherche blanc" />
            </button>
        </div>
    )
}

export default SearchBar
