'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import check_auth from '../auth_management/authetication/services/check_auth';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/project-management';
    const controllerInstance = controller(fastify);
    let middleware = { preHandler: check_auth };
    fastify
        .get(`${prefix}`, middleware , controllerInstance.all)
        .get(`${prefix}/:id`, controllerInstance.find)
        .post(`${prefix}/store`, controllerInstance.store)
        .post(`${prefix}/update`, controllerInstance.update)
        .post(`${prefix}/soft-delete`, controllerInstance.soft_delete)
        .post(`${prefix}/restore`, controllerInstance.restore)
        .post(`${prefix}/destroy`, controllerInstance.destroy)
        .post(`${prefix}/block`, controllerInstance.block)
        .post(`${prefix}/import`, controllerInstance.import);
};
