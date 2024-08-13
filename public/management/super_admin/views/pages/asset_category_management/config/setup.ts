import setup_type from './setup_type';

const prefix: string = 'Asset Category';
const setup: setup_type = {
    prefix,
    module_name: 'asset_category_management',

    route_prefix: 'asset-category-management',

    api_host: location.origin,
    api_prefix: 'asset-category-management',

    store_prefix: 'asset_category_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
