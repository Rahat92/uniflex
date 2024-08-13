import setup_type from './setup_type';

const prefix: string = 'Account Log';
const setup: setup_type = {
    prefix,
    module_name: 'account_log_management',

    route_prefix: 'account-log-management',

    api_host: location.origin,
    api_prefix: 'account-log-management',

    store_prefix: 'account_log_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
