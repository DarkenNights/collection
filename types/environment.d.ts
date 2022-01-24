namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        DATABASE_URL: string
        NEXT_PUBLIC_VERCEL_URL: string
        NEXT_PUBLIC_VERCEL_ENV: NodeEnvironment
        AWS_ACCESS_KEY_POPCOLLECTION: string
        AWS_SECRET_KEY_POPCOLLECTION: string
        AWS_BUCKET_POPCOLLECTION_IMAGE: string
        NEXT_PUBLIC_AWS_BUCKET_POPCOLLECTION_IMAGE: string
        AWS_REGION_POPCOLLECTION: string
        NEXT_PUBLIC_AWS_REGION_POPCOLLECTION: string
    }

    enum NodeEnvironment {
        development = 'development',
        test = 'test',
        production = 'production',
    }
}
