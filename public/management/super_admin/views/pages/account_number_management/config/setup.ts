import setup_type from './setup_type';

const prefix: string = 'Account Number';
const setup: setup_type = {
    prefix,
    module_name: 'account_number_management',

    route_prefix: 'account-number-management',

    api_host: location.origin,
    api_prefix: 'account-number-management',

    store_prefix: 'account_number_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
