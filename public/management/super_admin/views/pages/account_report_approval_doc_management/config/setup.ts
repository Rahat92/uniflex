import setup_type from './setup_type';

const prefix: string = 'Account Report Approval Doc';
const setup: setup_type = {
    prefix,
    module_name: 'account_report_approval_doc_management',

    route_prefix: 'account-report-approval-doc-management',

    api_host: location.origin,
    api_prefix: 'account-report-approval-doc-management',

    store_prefix: 'account_report_approval_doc_management',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
