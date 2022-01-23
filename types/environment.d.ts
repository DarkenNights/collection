namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        DATABASE_URL: string
        NEXT_PUBLIC_VERCEL_URL: string
        NEXT_PUBLIC_VERCEL_ENV: NodeEnvironment
        AWS_ACCESS_KEY: string
        AWS_SECRET_KEY: string
        AWS_BUCKET_IMAGE: string
    }

    enum NodeEnvironment {
        development = 'development',
        test = 'test',
        production = 'production',
    }
}
