namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        DATABASE_URL: string
        NEXT_PUBLIC_VERCEL_URL: string
        NEXT_PUBLIC_VERCEL_ENV: NodeEnvironment
    }

    enum NodeEnvironment {
        development = 'development',
        test = 'test',
        production = 'production',
    }
}
