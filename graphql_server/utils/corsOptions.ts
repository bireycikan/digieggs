import { CorsOptions } from "cors"

const whitelist: Array<string | undefined> = ['http://localhost:3000', 'https://studio.apollographql.com']
export const options: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ["GET", "POST"]
}