import React from 'react';
import { NonIndexRouteObject } from 'react-router-dom';
import DashboardLayout from '../views/layouts/DashboardLayout';
import T1 from '../views/pages/T1';
import user_branch_staff_routes from '../views/pages/users/config/routes';
import booking from '../views/pages/booking/config/routes';
import project from '../views/pages/project/config/routes';
import accounts from '../views/pages/accounts/config/routes';
import account_types from '../views/pages/accounts/menus/accounts/account_types/config/routes';
import account_categories from '../views/pages/accounts/menus/accounts/account_categories/config/routes';
import account_numbers from '../views/pages/accounts/menus/accounts/account_numbers/config/routes';
import project_income from '../views/pages/accounts/menus/payments/project_income/config/routes';
import internal_income from '../views/pages/accounts/menus/payments/internal_income/config/routes';
import expense from '../views/pages/accounts/menus/payments/expense/config/routes';
import debit_credit from '../views/pages/accounts/menus/payments/debit_credit/config/routes';
import closing_balance from '../views/pages/reports/menus/closing_balance/config/routes';
import customer_report from '../views/pages/reports/menus/customer_report/config/routes';
import due_report from '../views/pages/reports/menus/due_report/config/routes';
import expense_statement from '../views/pages/reports/menus/expense_statement/config/routes';
import incentive_report from '../views/pages/reports/menus/incentive_report/config/routes';
import income_statement from '../views/pages/reports/menus/income_statement/config/routes';
import project_report from '../views/pages/reports/menus/project_report/config/routes';

import assign_visit from '../views/pages/project_visit/menus/assign_visit/config/routes';
import visit_history from '../views/pages/project_visit/menus/visit_history/config/routes';


import project_payment from '../views/pages/project/menus/project_payment/config/routes';

import contact_management_routes from '../views/pages/contact_management/config/routes';
import asset_category_management from '../views/pages/asset_category_management/config/routes';
import asset_management from '../views/pages/asset_management/config/routes';
import account_log_management from '../views/pages/account_log_management/config/routes';
import account_number_management from '../views/pages/account_number_management/config/routes';
import project_customer_information_management from '../views/pages/project_customer_information_management/config/routes';
import account_report_approval_management from '../views/pages/account_report_approval_management/config/routes';
import account_report_approval_doc_management from '../views/pages/account_report_approval_doc_management/config/routes';
import project_customer_management from '../views/pages/project_customer_management/config/routes';
import project_payment_management from '../views/pages/project_payment_management/config/routes';
import project_responsibility_management from '../views/pages/project_responsibility_management/config/routes';
import project_visit_history_management from '../views/pages/project_visit_history_management/config/routes';
import project_visit_history_attatchment_management from '../views/pages/project_visit_history_attatchment_management/config/routes';
import profile_management from '../views/pages/profile_management/config/routes';

interface RouteTypes extends NonIndexRouteObject {}
const router: RouteTypes[] = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '',
                element: <T1 />,
            },
            user_branch_staff_routes,
            booking,
            project,
            accounts,
            account_types,
            account_categories,
            account_numbers,
            project_income,
            internal_income,
            expense,
            debit_credit,
            closing_balance,
            customer_report,
            due_report,
            expense_statement,
            incentive_report,
            income_statement,
            project_report,
            assign_visit,
            visit_history,
            project_payment,
            contact_management_routes,
            asset_category_management,
            asset_management,
            account_log_management,
            account_number_management,
            project_customer_information_management,
            account_report_approval_management,
            account_report_approval_doc_management,
            project_customer_management,
            project_payment_management,
            project_responsibility_management,
            project_visit_history_management,
            project_visit_history_attatchment_management
        ],
    },
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/profile-management',
                element: <T1 />,
            },
            profile_management
        ],
    }
];

export default router;
