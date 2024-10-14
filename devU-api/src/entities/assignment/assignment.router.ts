// Libraries
import multer from 'multer'
import express from 'express'

// Middleware
import validator from './assignment.validator'
import { asInt } from '../../middleware/validator/generic.validator'

// Controller
import AssignmentsController from './assignment.controller'
import { isAuthorized, isAuthorizedByAssignmentStatus } from '../../authorization/authorization.middleware'

const Router = express.Router({ mergeParams: true })
const upload = multer({ limits: { fileSize: 1024 * 1024 * 5 } }) // 5MB file size limit

/**
 * @swagger
 * /course/:courseId/assignments/released:
 *   get:
 *     summary: Retrieve a list of a course's assignments that have been released (Start date prior to current time)
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: Enter course id
 *         required: true
 *         schema:
 *           type: integer
 */
Router.get('/released', isAuthorized('assignmentViewReleased'), AssignmentsController.getReleased)

/**
 * @swagger
 * /course/:courseId/assignments:
 *   get:
 *     summary: Retrieve a list of a course's assignments
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: Enter course id
 *         required: true
 *         schema:
 *           type: integer
 */
Router.get('/', isAuthorized('assignmentViewAll'), AssignmentsController.getByCourse)

/**
 * @swagger
 * /course/:courseId/assignments/attachments/{assignmentId}/{filename}:
 *   get:
 *     summary: Retrieve attachments for a assignments
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: Enter course id
 *         required: true
 *         schema:
 *           type: integer
 *      - name: assignmentId
 *         in: path
 *         description: Enter assignment id
 *         required: true
 *         schema:
 *           type: integer
 *      - name: filename
 *         in: path
 *         description: Enter filename to retrieve
 *         required: true
 *         schema:
 *           type: string
 */
Router.get('/attachments/:assignmentId/:filename', isAuthorizedByAssignmentStatus, AssignmentsController.handleAttachmentLink)

/**
 * @swagger
 * /course/:courseId/assignments/{id}:
 *   get:
 *     summary: Retrieve a single assignment
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: Enter course id
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         description: Enter assignment id
 *         required: true
 *         schema:
 *           type: integer
 */
Router.get('/:assignmentId', asInt('assignmentId'), isAuthorizedByAssignmentStatus, AssignmentsController.detail)

/**
 * @swagger
 * /course/:courseId/assignments:
 *   post:
 *     summary: Create an assignment
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: Enter course id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 */


Router.post('/', isAuthorized('assignmentEditAll'), upload.array('files'), validator, AssignmentsController.post)

/**
 * @swagger
 * /course/:courseId/assignments/{id}:
 *   put:
 *     summary: Update an assignment
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: Enter course id
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 */
Router.put(
  '/:assignmentId',
  isAuthorized('assignmentEditAll'),
  asInt('assignmentId'),
  validator,
  AssignmentsController.put,
)

/**
 * @swagger
 * /course/:courseId/assignments/{id}:
 *   delete:
 *     summary: Delete an assignment
 *     tags:
 *       - Assignments
 *     responses:
 *       '200':
 *         description: OK
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: Enter course id
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
Router.delete('/:assignmentId', isAuthorized('assignmentEditAll'), asInt('assignmentId'), AssignmentsController._delete)

export default Router
