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
                'id,account_id,account_number_id,uid,date,amount,user_id,type,status'
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
                                            label={`Account Id`}
                                            col_name={`account_id`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Account Number Id`}
                                            col_name={`account_number_id`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`UID`}
                                            col_name={`uid`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Date`}
                                            col_name={`date`}
                                            sort={true}
                                        />
                                        <TableHeading
                                            label={`Amount`}
                                            col_name={`amount`}
                                            sort={true}
                                        />
                                        {/* <TableHeading
                                            label={`User Id`}
                                            col_name={`user_id`}
                                            sort={true}
                                        /> */}
                                        <th>User Id</th>
                                        <TableHeading
                                            label={`Expence`}
                                            col_name={`expence`}
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
                                                            {i.account_id}
                                                        </span>
                                                    </td>
                                                    <td>{i.account_number_id}</td>
                                                    <td>{i.uid}</td>
                                                    <td>{i.date}</td>
                                                    <td>{i.amount}</td>
                                                    <td>{i.user_id}</td>
                                                    <td>{i.type}</td>
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
