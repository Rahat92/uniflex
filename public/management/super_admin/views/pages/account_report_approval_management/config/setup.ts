import setup_type from './setup_type';

const prefix: string = 'Account Report Approval';
const setup: setup_type = {
    prefix,
    module_name: 'account_report_approval_management',

    route_prefix: 'account-report-approval-management',

    api_host: location.origin,
    api_prefix: 'account-report-approval-management',

    store_prefix: 'account_report_approval_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
