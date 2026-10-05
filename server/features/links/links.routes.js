import { Router } from 'express'
import { createLink, deleteLink, listLinks, redirectLink } from './links.controller.js'

export const redirectRouter = Router()
redirectRouter.get('/:shortCode', redirectLink)

const router = Router()

router.get('/', listLinks)
router.post('/', createLink)
router.delete('/:id', deleteLink)

export default router
