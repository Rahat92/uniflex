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
        'account_log_id',
        'user_id',
        'date',
        'project_id',
        'reference_user_id',
        'amount',
        'reference_user_id',
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
    let data = new models.ProjectPaymentModel();

    let date_path = "";

    // if(body['date'].ext){
    //     date_path =
    //         'uploads/project-payments/' +
    //         moment().format('YYYYMMDDHHmmss') +
    //         body['date'].ext;
    //     await (fastify_instance as any).upload(body['date'], date_path);
    // }
    
    let inputs: InferCreationAttributes<typeof data> = {
        account_log_id: body.account_log_id,
        user_id: body.user_id,
        date: body.date,
        type: body.type,
        project_id: body.project_id,
        reference_user_id: body.reference_user_id,
        amount: body.amount,
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
