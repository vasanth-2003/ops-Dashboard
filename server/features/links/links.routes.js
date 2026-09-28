import { Router } from 'express'
import { createLink, listLinks, redirectLink } from './links.controller.js'

export const redirectRouter = Router()
redirectRouter.get('/:shortCode', redirectLink)

const router = Router()

router.get('/', listLinks)
router.post('/', createLink)

export default router
