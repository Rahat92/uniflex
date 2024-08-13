import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import setup from './config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { all } from './config/store/async_actions/all';
import setup from './config/setup';
import { initialState } from './config/store/inital_state';
import Header from './components/all_data_page/Header';
import TableFooter from './components/all_data_page/TableFooter';
import Paginate from '../../components/Paginate';
import Filter from './components/canvas/Filter';
import QuickView from './components/canvas/QuickView';
import storeSlice from './config/store';
import { anyObject } from '../../../common_types/object';
import TableRowAction from './components/all_data_page/TableRowAction';
import SelectItem from './components/all_data_page/SelectItem';
import SelectAll from './components/all_data_page/SelectIAll';
import TableHeading from './components/all_data_page/TableHeading';
import { useSearchParams } from 'react-router-dom';

export interface Props { }

const All: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const [pageTitle, setPageTitle] = useState('');

    const dispatch = useAppDispatch();
    let [searchParams] = useSearchParams();

    useEffect(() => {
        let role = searchParams.get('role');
        if (role) {
            setPageTitle(role);
            dispatch(storeSlice.actions.set_role(role));
        } else {
            dispatch(storeSlice.actions.set_role('all'));
        }

        dispatch(
            storeSlice.actions.set_select_fields(
                'id,date,openning_balance,closing_balance,total_income,total_expence,approved_by,is_approved,not_approved_comment,approved_comment,status'
            ),
        );
        dispatch(all({}));
    }, [searchParams]);

    function quick_view(data: anyObject = {}) {
        dispatch(storeSlice.actions.set_item(data));
        dispatch(storeSlice.actions.set_show_quick_view_canvas(true));
    }

    return (
        <div className="page_content">
            <div className="explore_window fixed_size">
                <Header title={pageTitle+' user'}></Header>

                <div className="content_body">
                    <div className="data_list">
                        <div className="table_responsive custom_scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th />
                                        <th>
                                            <SelectAll />
                                        </th>
                                        <TableHeading
                                            label={`ID`}
                                            col_name={`id`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Date`}
                                            col_name={`date`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Openning Balance`}
                                            col_name={`openning_balance`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Closing Balance`}
                                            col_name={`closing_balance`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Total Income`}
                                            col_name={`total_income`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Total Expence`}
                                            col_name={`total_expence`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Approved By`}
                                            col_name={`approved_by`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Is Approved`}
                                            col_name={`is_approved`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Approved Comment`}
                                            col_name={`approved_comment`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Not Approved Comment`}
                                            col_name={`not_approved_comment`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Status`}
                                            col_name={`status`}
                                            sort={true}
                                        />
                                    </tr>
                                </thead>
                                <tbody id="all_list">
                                    {(state.all as any)?.data?.map(
                                        (i: { [key: string]: any }) => {
                                            return (
                                                <tr
                                                    key={i.id}
                                                    className={`table_rows table_row_${i.id}`}
                                                >
                                                    <td>
                                                        <TableRowAction
                                                            item={i}
                                                        />
                                                    </td>
                                                    <td>
                                                        <SelectItem item={i} />
                                                    </td>
                                                    <td>{i.id}</td>
                                                    <td>
                                                        <span
                                                            className="quick_view_trigger"
                                                            onClick={() =>
                                                                quick_view(i)
                                                            }
                                                        >
                                                            {i.date}
                                                        </span>
                                                    </td>
                                                    <td>{i.openning_balance}</td>
                                                    <td>{i.closing_balance}</td>
                                                    <td>{i.total_income}</td>
                                                    <td>{i.total_expence}</td>
                                                    <td>{i.approved_by}</td>
                                                    <td>{i.is_approved}</td>
                                                    <td>{i.approved_comment}</td>
                                                    <td>{i.not_approved_comment}</td>
                                                    <td>{i.status}</td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Paginate
                            set_url={storeSlice.actions.set_url}
                            set_paginate={storeSlice.actions.set_paginate}
                            set_page={storeSlice.actions.set_page}
                            all={all}
                            data={state.all as any}
                            selected_paginate={state.paginate}
                        ></Paginate>
                    </div>
                </div>
                <TableFooter></TableFooter>
            </div>

            <Filter></Filter>
            <QuickView></QuickView>
        </div>
    );
};

export default All;
