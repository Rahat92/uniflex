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
        'date',
        'openning_balance',
        'closing_balance',
        'total_income',
        'total_expence',
        'approved_by',
        'is_approved',
        'not_approved_comment',
        'approved_comment',
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
    let user_model = new models.AccountReportApprovalModel();

    let inputs: InferCreationAttributes<typeof user_model> = {
        date: body.date,
        openning_balance: body.openning_balance,
        closing_balance: body.closing_balance,
        total_income: body.total_income,
        total_expence: body.total_expence,
        is_approved: body.is_approved,
        approved_by: body.approved_by,
        approved_comment: body.approved_comment,
        not_approved_comment: body.not_approved_comment
    };


    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.AccountReportApprovalModel.findByPk(body.id);
        if (data) {
            data.update(inputs);
            await data.save();

            // if(body['date']['ext']){
            //     let date_path =
            //         'uploads/account-report-approvals/' +
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
        let openning_balance = await error_trace(models, error, req.url, req.body);
        if (error instanceof custom_error) {
            error.openning_balance = openning_balance;
        } else {
            throw new custom_error('server error', 500, error.message, openning_balance);
        }
        throw error;
    }
}

export default update;
