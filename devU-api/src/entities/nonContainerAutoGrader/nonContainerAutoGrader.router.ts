// Libraries
import express from 'express'

// Middleware
import validator from './nonContainerAutoGrader.validator'
import { asInt } from '../../middleware/validator/generic.validator'
import { isAuthorized } from '../../authorization/authorization.middleware'

// Controller
import nonContainerQuestions from './nonContainerAutoGrader.controller'

const Router = express.Router()

/**
 * @swagger
 * /course/:courseId/assignment/:assignmentId/nonContainerAutoGraders:
 *   get:
 *     summary: Retrieve a list of all nonContainerAutoGrader with the assignment ID
 *     tags:
 *       - NonContainerAutoGraders
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: assignmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
Router.get('/', isAuthorized('assignmentViewAll'), nonContainerQuestions.getByAssignmentId)

/**
 * @swagger
 * /course/:courseId/assignment/:assignmentId/nonContainerAutoGraders/byId/{id}:
 *   get:
 *     summary: Retrieve a single non container auto grader
 *     tags:
 *       - NonContainerAutoGraders
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
Router.get('/byId/:id', isAuthorized('assignmentViewAll'), asInt(), nonContainerQuestions.detail)

/**
 * @swagger
 * /course/:courseId/assignment/:assignmentId/nonContainerAutoGraders:
 *   post:
 *     summary: Create a question
 *     tags:
 *       - NonContainerAutoGraders
 *     responses:
 *       '200':
 *         description: OK
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/NonContainerAutoGrader'
 */
Router.post('/', isAuthorized('assignmentEditAll'), validator, nonContainerQuestions.post)

/**
 * @swagger
 * /course/:courseId/assignment/:assignmentId/nonContainerAutoGraders:
 *   put:
 *     summary: Update a question
 *     tags:
 *       - NonContainerAutoGraders
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/NonContainerAutoGrader'
 */
Router.put('/:id', isAuthorized('assignmentEditAll'), asInt(), validator, nonContainerQuestions.put)

/**
 * @swagger
 * /course/:courseId/assignment/:assignmentId/nonContainerAutoGraders/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags:
 *       - NonContainerAutoGraders
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
Router.delete('/:id', isAuthorized('assignmentEditAll'), asInt(), nonContainerQuestions._delete)

export default Router
