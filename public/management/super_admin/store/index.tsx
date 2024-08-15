import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';
import booking from '../views/pages/booking/config/store';
import project_management_store from '../views/pages/project/config/store';
import accounts from '../views/pages/accounts/config/store';
import account_types from '../views/pages/accounts/menus/accounts/account_types/config/store';
import account_categories from '../views/pages/accounts/menus/accounts/account_categories/config/store';
import account_numbers from '../views/pages/accounts/menus/accounts/account_numbers/config/store';
import project_income from '../views/pages/accounts/menus/payments/project_income/config/store';
import internal_income from '../views/pages/accounts/menus/payments/internal_income/config/store';
import expense from '../views/pages/accounts/menus/payments/expense/config/store';
import debit_credit from '../views/pages/accounts/menus/payments/debit_credit/config/store';
// Reports 
import closing_balance from '../views/pages/reports/menus/closing_balance/config/store';
import customer_report from '../views/pages/reports/menus/customer_report/config/store';
import due_report from '../views/pages/reports/menus/due_report/config/store';
import expense_statement from '../views/pages/reports/menus/expense_statement/config/store';
import incentive_report from '../views/pages/reports/menus/incentive_report/config/store';
import income_statement from '../views/pages/reports/menus/income_statement/config/store';
import project_report from '../views/pages/reports/menus/project_report/config/store';

import assign_visit from '../views/pages/project_visit/menus/assign_visit/config/store';
import visit_history from '../views/pages/project_visit/menus/visit_history/config/store';

import project_payment from '../views/pages/project/menus/project_payment/config/store';

import contact_management_store from '../views/pages/contact_management/config/store';
import asset_category_management_store from '../views/pages/asset_category_management/config/store';
import asset_management_store from '../views/pages/asset_management/config/store';
import account_log_management_store from '../views/pages/account_log_management/config/store';
import account_number_management_store from '../views/pages/account_number_management/config/store';
import project_customer_information_management_store from '../views/pages/project_customer_information_management/config/store';
import account_report_approval_management_store from '../views/pages/account_report_approval_management/config/store';
import account_report_approval_doc_management_store from '../views/pages/account_report_approval_doc_management/config/store';
import project_customer_management_store from '../views/pages/project_customer_management/config/store';
import project_payment_management_store from '../views/pages/project_payment_management/config/store';
import project_responsibility_management_store from '../views/pages/project_responsibility_management/config/store';
import project_visit_history_management_store from '../views/pages/project_visit_history_management/config/store';
import project_visit_history_attatchment_management_store from '../views/pages/project_visit_history_attatchment_management/config/store';
// import profile_management_store from '../views/pages/profile_management/config/store';

const store = configureStore({
    reducer: {
        users: users.reducer,
        booking: booking.reducer,
        project_management_store: project_management_store.reducer,
        accounts: accounts.reducer,
        account_types: account_types.reducer,
        account_categories: account_categories.reducer,
        account_numbers: account_numbers.reducer,
        project_income: project_income.reducer,
        internal_income: internal_income.reducer,
        expense: expense.reducer,
        common_store: commonStore.reducer,
        debit_credit: debit_credit.reducer,
        // Reports 
        closing_balance: closing_balance.reducer,
        customer_report: customer_report.reducer,
        due_report: due_report.reducer,
        expense_statement: expense_statement.reducer,
        incentive_report: incentive_report.reducer,
        income_statement: income_statement.reducer,
        project_report: project_report.reducer,
        assign_visit: assign_visit.reducer,
        visit_history: visit_history.reducer,
        project_payment: project_payment.reducer,
        
        contact_management: contact_management_store.reducer,
        asset_category_management: asset_category_management_store.reducer,
        asset_management: asset_management_store.reducer,
        account_log_management: account_log_management_store.reducer,
        account_number_management: account_number_management_store.reducer,
        project_customer_information_management: project_customer_information_management_store.reducer,
        account_report_approval_management: account_report_approval_management_store.reducer,
        account_report_approval_doc_management:account_report_approval_doc_management_store.reducer,
        project_customer_management:project_customer_management_store.reducer,
        project_payment_management:project_payment_management_store.reducer,
        project_responsibility_management:project_responsibility_management_store.reducer,
        project_visit_history_management:project_visit_history_management_store.reducer,
        project_visit_history_attatchment_management:project_visit_history_attatchment_management_store.reducer,
        project_management:project_management_store.reducer,
        // profile_management:profile_management_store.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
