import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';
import custom_error from '../helpers/custom_error';
import error_trace from '../helpers/error_trace';
import moment from 'moment';

/** validation rules */
async function validate(req: Request) {
    let field = '';
    let fields = [
        'name',
        'phone_number',
        'permanent_address',
        'present_address',
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

// async function update(
//     fastify_instance: FastifyInstance,
//     req: FastifyRequest,
// ): Promise<responseObject> {
//     throw new Error('500 test');
// }

async function update_profile(
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
    let user_model = new models.UserModel();
    let user_information = new models.UserInformationModel();

    let password = null;
    if (body.password) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        password = await bcrypt.hash(body.password, saltRounds);
    }
    
    let inputs: InferCreationAttributes<typeof user_model> = {
        name: body.name,
        phone_number: body.phone_number,        
    };
    if (password) {
        inputs.password = password;
    }
    
    let user_information_inputs: InferCreationAttributes<
        typeof user_information
    > = {
        permanent_address: body.permanent_address,
        present_address: body.present_address,
        user_id: 0,
        nid: ''
    };

    /** store data into database */
    try {
        let data = await models.UserModel.findByPk(body.id);
        if (data) {
            data.update(inputs);
            await data.save();

            if(body['image']['ext']){
                let image_path =
                    'uploads/users/' +
                    moment().format('YYYYMMDDHHmmss') +
                    body['image'].ext;
                await (fastify_instance as any).upload(body['image'], image_path);

                data.image = image_path;
                await data.save();
            }

            let user_information = await models.UserInformationModel.findOne({
                where: {
                    user_id: data.id,
                },
            });

            user_information_inputs.user_id = data.id || 0;
            if (user_information) {
                user_information.update(user_information_inputs);
                await user_information.save();
            } else {
                user_information = await models.UserInformationModel.create(
                    user_information_inputs,
                );
            }
            return response(201, 'data updated', { data, user_information });
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

export default update_profile;
