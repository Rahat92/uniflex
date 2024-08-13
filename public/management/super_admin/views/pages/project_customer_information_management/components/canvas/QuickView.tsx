import React from 'react';
import { createPortal } from 'react-dom';
import { RootState, useAppDispatch } from '../../../../../store';
import storeSlice from '../../config/store';
import { initialState } from '../../config/store/inital_state';
import { useSelector } from 'react-redux';
import setup from '../../config/setup';
export interface Props { }

const modalRoot = document.getElementById('filter-root');

const QuickView: React.FC<Props> = (props: Props) => {
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const dispatch = useAppDispatch();

    function close_canvas(action: boolean = true) {
        dispatch(storeSlice.actions.set_show_quick_view_canvas(action));
    }

    if (modalRoot && state.show_quick_view_canvas) {
        return createPortal(
            <div className="off_canvas quick_view">
                <div className="off_canvas_body">
                    <div className="header">
                        <h3 className="heading_text">Quick View</h3>
                        <button
                            className="close_button"
                            onClick={() => close_canvas(false)}
                        >
                            <span className="material-symbols-outlined fill">
                                close
                            </span>
                        </button>
                    </div>

                    <div className="data_content">
                        <table className="table quick_modal_table">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>:</th>
                                    <th>{state.item.id}</th>
                                    
                                </tr>
                                <tr>
                                    <th>Account Id</th>
                                    <th>:</th>
                                    <th>{state.item.account_id}</th>
                                </tr>
                                <tr>
                                    <th>Account Number Id</th>
                                    <th>:</th>
                                    <th>{state.item.account_number_id}</th>
                                </tr>
                                <tr>
                                    <th>UID</th>
                                    <th>:</th>
                                    <th>{state.item.uid}</th>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <th>:</th>
                                    <th>{state.item.date}</th>
                                </tr>
                                <tr>
                                    <th>Amount</th>
                                    <th>:</th>
                                    <th>{state.item.amount}</th>
                                </tr>
                                <tr>
                                    <th>User Id</th>
                                    <th>:</th>
                                    <th>{state.item.user_id}</th>
                                </tr>
                                <tr>
                                    <th>Expence</th>
                                    <th>:</th>
                                    <th>{state.item.expence}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="off_canvas_overlay"></div>
            </div>,
            modalRoot,
        );
    } else {
        return <></>;
    }
};

export default QuickView;
