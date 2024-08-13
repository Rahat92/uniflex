import setup_type from './setup_type';

const prefix: string = 'Your Profile';
const setup: setup_type = {
    prefix,
    module_name: 'profile_management',

    route_prefix: 'profile-management',

    api_host: location.origin,
    api_prefix: 'profile-management',

    store_prefix: 'profile_management',
    layout_title: prefix,

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
