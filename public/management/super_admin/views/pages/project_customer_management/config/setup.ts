import setup_type from './setup_type';

const prefix: string = 'Project Customer';
const setup: setup_type = {
    prefix,
    module_name: 'project_customer_management',

    route_prefix: 'project-customer-management',

    api_host: location.origin,
    api_prefix: 'project-customer-management',

    store_prefix: 'project_customer_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
