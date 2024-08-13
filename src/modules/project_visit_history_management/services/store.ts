import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'project_id',
        'user_id',
        'is_complete',
        'comments',
        'date',
        'time',
        'present_time',
        'leave_time'
    ];

    for (let index = 0; index < fields.length; index++) {
        const field = fields[index];
        await body(field)
            .not()
            .isEmpty()
            .withMessage(
                `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
            )
            .run(req);
    }

    // field = 'reference';
    // await body(field)
    //     .not()
    //     .isEmpty()
    //     .custom(async (value) => {
    //         const length = value.length;
    //         if (length <= 2) {
    //             throw new Error(
    //                 `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
    //             );
    //         }
    //     })
    //     .withMessage(
    //         `the <b>${field.replaceAll('_', ' ')}</b> field is required`,
    //     )
    //     .run(req);

    let result = await validationResult(req);

    return result;
}
// async function store(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }
async function store(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let models = await db();
    let body = req.body as anyObject;
    let data = new models.ProjectVisitHistoryModel();

    let date_path = "";

    // if(body['date'].ext){
    //     date_path =
    //         'uploads/project-visit-histories/' +
    //         moment().format('YYYYMMDDHHmmss') +
    //         body['date'].ext;
    //     await (fastify_instance as any).upload(body['date'], date_path);
    // }
    

    // let reference = JSON.parse(body.reference)[0];

    let user_id = null;
    let project_id = null;

    if(body.user_id){
        user_id = JSON.parse(body.user_id)[0];
    }
    if(body.project_id){
        project_id = JSON.parse(body.project_id)[0];
    }

    let inputs: InferCreationAttributes<typeof data> = {
        project_id: project_id,
        user_id: user_id,
        is_complete: body.is_complete,
        comments: body.comments,
        date: body.date,
        time: body.time,
        present_time: body.present_time,
        leave_time: body.leave_time,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();

        return response(201, 'data created', {
            data,
        });
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        throw new custom_error('server error', 500, error.message, uid);
        // throw error;
    }
}

export default store;
