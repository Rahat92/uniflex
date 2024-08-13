import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import { useSelector } from 'react-redux';
import setup from './config/setup';
import projectSetup from '../project/config/setup';
import userSetup from '../users/config/setup';
import { RootState, useAppDispatch } from '../../../store';
import { details } from './config/store/async_actions/details';
import { details as projectDetails } from '../project/config/store/async_actions/details';
import { details as userDetails } from '../users/config/store/async_actions/details';
import { initialState } from './config/store/inital_state';
import { initialState as projectInitialState } from '../project/config/store/inital_state';
import { initialState as userInitialState } from '../users/config/store/inital_state';
import { Link, useParams } from 'react-router-dom';
import storeSlice from './config/store';
import projectStoreSlice from '../project/config/store';
import ProjectIdDropDown from '../project/components/dropdown/DropDown';
import userStoreSlice from '../users/config/store';
import userIdDropDown from '../users/components/dropdown/DropDown';
import { update } from './config/store/async_actions/update';
import Input from './components/management_data_page/Input';
import InputImage from './components/management_data_page/InputImage';
import DropDown from './components/dropdown/DropDown';
import UserIdDropDown from '../users/components/dropdown/DropDown';
import Select from './components/management_data_page/Select';
import { anyObject } from '../../../common_types/object';
import { NomineeType, set_nominee } from './helpers/nominee_helpers';
import Nominee from './components/Nominee';
export interface Props { }

const Edit: React.FC<Props> = (props: Props) => {
    const [projectTitle, setProjectTitle] = useState('')
    const state: typeof initialState = useSelector(
        (state: RootState) => state[setup.module_name],
    );

    const projectState: typeof projectInitialState = useSelector(
        (state: RootState) => state[projectSetup.module_name],
    );

    const userState: typeof userInitialState = useSelector(
        (state: RootState) => state[userSetup.module_name],
    );
    
    const dispatch = useAppDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch(storeSlice.actions.set_item({}));
        dispatch(details({ id: params.id }) as any);
    }, []);

    useEffect(() => {
        dispatch(projectStoreSlice.actions.set_item({}));
        dispatch(projectDetails({ id: state.item.project_id }) as any);
    }, [state?.item?.project_id]);

    useEffect(() => {
        dispatch(userStoreSlice.actions.set_item({}));
        dispatch(userDetails({ id: state.item.user_id }) as any);
    }, [state?.item?.user_id]);

    useEffect(() => {
        if (state.item?.reference_info) {
            dispatch(
                storeSlice.actions.set_selected([state.item.reference_info]),
            );
        }
        // console.log(state.item);
    }, [state.item]);
    // console.log(state)
    
    async function handle_submit(e) {
        e.preventDefault();
        let form_data = new FormData(e.target);

        const response = await dispatch(update(form_data) as any);
    }

    function get_value(key) {
        try {
            if (state.item[key]) return state.item[key];
            if (state.item?.info[key]) return state.item?.info[key];
        } catch (error) {
            return '';
        }
        return '';
    }
    function get_project_value(key) {
        try {
            if (projectState.item[key]) return projectState.item[key];
            if (projectState.item?.info[key]) return projectState.item?.info[key];
        } catch (error) {
            return '';
        }
        return '';
    }
    function get_user_value(key) {
        try {
            if (userState.item[key]) return userState.item[key];
            if (userState.item?.info[key]) return userState.item?.info[key];
        } catch (error) {
            return '';
        }
        return '';
    }

    useEffect(() => {
        if(projectState?.item?.title?.length>0){
            setProjectTitle(projectState.item.title)
        }
    }, [projectState?.item?.title])

    if(get_project_value('title')?.length>0 && get_user_value('name')?.length>0)
    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.edit_page_title}></Header>

                    {Object.keys(state.item).length && (
                        <div className="content_body custom_scroll">
                            <form
                                onSubmit={(e) => handle_submit(e)}
                                className="mx-auto pt-3"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    defaultValue={get_value(`id`)}
                                />

                                <div>
                                    <h5 className="mb-4">
                                        Personal Informations
                                    </h5>
                                    <div className="form_auto_fit">
                                        {/* <div className="form-group form-vertical">
                                            <Select
                                                label="Role"
                                                name="role"
                                                value={state.item.role}
                                                values={[
                                                    { text: 'Marketing', value: 'marketing' },
                                                    { text: 'Staff', value: 'staff' },
                                                    { text: 'Accountant', value: 'accountant' },
                                                    { text: 'HRM', value: 'hrm' },
                                                    { text: 'Management', value: 'management' },
                                                ]}
                                            />
                                        </div> */}
                                        {/* <div className="form-group form-vertical">
                                            <Input
                                                name={'uid'}
                                                label="Employee ID"
                                                value={get_value("uid")}
                                            />
                                        </div> */}
                                        {/* {[
                                            'project_id','user_id','date','time','is_complete','comments','present_time','leave_time'
                                        ].map((i) => (
                                            <div className="form-group form-vertical">
                                                <Input
                                                    name={i}
                                                    value={get_value(i)}
                                                />
                                            </div>
                                        ))} */}
                                    {[
                                        'project_id','user_id','date','time','is_complete','comments','present_time','leave_time'
                                    ].map((i) => (
                                        <div className="form-group form-vertical">
                                            {/* <Input name={i} /> */}
                                            {i=='project_id'?
                                                <>
                                                    <label>
                                                        Select Project
                                                    </label>
                                                    <div className='form_elements'>
                                                        <ProjectIdDropDown name={i} default_value = {[{title:get_project_value('title')}]} get_selected_data={() => {
                                                            console.log('Hello')
                                                        }} multiple={false} />
                                                    </div>
                                                </>
                                            :i==='user_id'?
                                            <>
                                                <label>
                                                    Select User
                                                </label>
                                                <div className='form_elements'>
                                                    <UserIdDropDown name={'user_id'}  default_value = {[{name:get_user_value('name')}]} get_selected_data={() => {
                                                        console.log('Hello')
                                                    }} multiple={false} />
                                                </div>
                                            </>
                                            :i==='is_complete'?
                                            <div className="form-group form-vertical">
                                                <Select
                                                    label="Is Complete"
                                                    name="is_complete"
                                                    value={get_value(i) == 0?false:true}
                                                    values={[
                                                        { text: 'Complete', value: true },
                                                        { text: 'Incomplete', value: false }
                                                    ]}
                                                />
                                            </div>
                                            :<Input value={i==='date'?get_value(i).split('T')[0]:get_value(i)} name={i} type={i==='time' || i==='present_time' || i=== 'leave_time'?'time':i==='date'?'date':'text'} />}
                                        </div>
                                    ))}
                                    </div>
                                </div>

                                <div className="form-group form-vertical">
                                    <label></label>
                                    <div className="form_elements">
                                        <button className="btn btn-outline-info">
                                            submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    <Footer>
                        {state?.item?.id && (
                            <li>
                                <Link
                                    to={`/${setup.route_prefix}/details/${state.item?.id}`}
                                    className="outline"
                                >
                                    <span className="material-symbols-outlined fill">
                                        visibility
                                    </span>
                                    <div className="text">Details</div>
                                </Link>
                            </li>
                        )}
                    </Footer>
                </div>
            </div>
        </>
    );
};

export default Edit;
