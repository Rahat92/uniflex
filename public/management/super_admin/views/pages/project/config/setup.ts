import setup_type from './setup_type';

const prefix: string = 'Project';
const setup: setup_type = {
    prefix,
    module_name: 'project_management',

    route_prefix: 'project-management',

    api_host: location.origin,
    api_prefix: 'project-management',

    store_prefix: 'project_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
    
};

export default setup;
