import { cleanEnv, port, str } from 'envalid'
import 'reflect-metadata'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config'
import { dbConnection } from '@database'
import { ErrorMiddleware } from '@middlewares/error.middleware'
import { logger, stream } from '@utils/logger'
import { AuthRoute } from '@routes/auth.route'
import { UserRoute } from '@routes/users.route'
import { TestRoute } from './routes/test.route'

class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor() {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 3000

    this.inittializeEnv()
    this.connectToDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeSwagger()
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`Express: v1.0.0 ENV: ${this.env}`)
      logger.info(`🚀 App listening on the port ${this.port}`)
    })
  }

  private inittializeEnv() {
    cleanEnv(process.env, {
      NODE_ENV: str(),
      PORT: port(),
    })
  }

  private async connectToDatabase() {
    await dbConnection()
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }))
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }))
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  private initializeRoutes() {
    this.app.use('/v1', new AuthRoute().router)

    // this.app.post('/v1/auth/register', (req, res) => res.send('ok'))
    // this.app.use('/v1', new TestRoute().router)
    // this.app.use(new UserRoute().router);
    // this.app.use(new AuthRoute().router);
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    }

    const specs = swaggerJSDoc(options)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware)
  }
}

new App().listen()
