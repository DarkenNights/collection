// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
import {NextApiRequest, NextApiResponse} from "next";

export default function initMiddleware(middleware: (arg0: any, arg1: any, arg2: (result: any) => void) => void) {
    return (req: NextApiRequest, res: NextApiResponse) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result)
                }
                return resolve(result)
            })
        })
}
