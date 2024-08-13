import setup_type from './setup_type';

const prefix: string = 'Project Visit History';
const setup: setup_type = {
    prefix,
    module_name: 'project_visit_history_management',

    route_prefix: 'project-visit-history-management',

    api_host: location.origin,
    api_prefix: 'project-visit-history-management',

    store_prefix: 'project_visit_history_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
