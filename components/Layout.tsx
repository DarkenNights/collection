import { NextPage } from 'next'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout: NextPage = ({ children }) => {
    return (
        <>
            <Head>
                <title>Collection</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
