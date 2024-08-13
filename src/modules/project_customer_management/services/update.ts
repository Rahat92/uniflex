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
        'id',
        'project_id',
        'user_id',
        'date',
        'total_share',
        'have_to_pay_amount',
        'paid',
        'reference_user_id'
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

    let result = await validationResult(req);

    return result;
}

// async function update(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function update(
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
    let user_model = new models.ProjectCustomerModel();

    let inputs: InferCreationAttributes<typeof user_model> = {
        id: body.id,
        project_id: body.project_id,
        user_id: body.user_id,
        date: body.date,
        total_share: body.total_share,
        have_to_pay_amount: body.have_to_pay_amount,
        paid: body.paid,
        reference_user_id: body.reference_user_id,
    };


    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.ProjectCustomerModel.findByPk(body.id);
        if (data) {
            data.update(inputs);
            await data.save();

            // if(body['date']['ext']){
            //     let date_path =
            //         'uploads/project-customers/' +
            //         moment().format('YYYYMMDDHHmmss') +
            //         body['date'].ext;
            //     await (fastify_instance as any).upload(body['date'], date_path);

            //     data.date = date_path;
            //     await data.save();
            // }

            return response(201, 'data updated', { data });
        } else {
            throw new custom_error(
                'data not found',
                404,
                'operation not possible',
            );
        }
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default update;
