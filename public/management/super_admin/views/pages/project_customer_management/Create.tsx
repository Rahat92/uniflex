import React, { useEffect, useState } from 'react';
import Header from './components/management_data_page/Header';
import Footer from './components/management_data_page/Footer';
import setup from './config/setup';
import { useAppDispatch } from '../../../store';
import { store } from './config/store/async_actions/store';
import DropDown from './components/dropdown/DropDown';
import Input from './components/management_data_page/Input';
import Select from './components/management_data_page/Select';
import InputImage from './components/management_data_page/InputImage';
import Nominee from './components/Nominee';
import { anyObject } from '../../../common_types/object';
import { NomineeType, set_nominee } from './helpers/nominee_helpers';

export interface Props { }


const Create: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const [FormPageNominees, setFromPageNominees] = useState<NomineeType[]>([]);

    useEffect(() => {
        init_nominee()
    }, []);

    function init_nominee() {
        setFromPageNominees([
            set_nominee(),
            set_nominee(),
        ]);
    }

    async function handle_submit(e) {
        e.preventDefault();
        let form_data = new FormData(e.target);
        form_data.append('nominees', JSON.stringify(FormPageNominees));

        const response = await dispatch(store(form_data) as any);
        if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
            // e.target.reset();
            // init_nominee();
        }
    }

    return (
        <>
            <div className="page_content">
                <div className="explore_window fixed_size">
                    <Header page_title={setup.create_page_title}></Header>
                    <div className="content_body custom_scroll">
                        <form
                            onSubmit={(e) => handle_submit(e)}
                            className="mx-auto pt-3"
                        >
                            <div>
                                <h5 className="mb-4">Personal Informations</h5>
                                <div className="form_auto_fit">
                                    {/* <div className="form-group form-vertical">
                                        <Select
                                            label="Role"
                                            name="role"
                                            values={[
                                                { text: 'Marketing', value: 'marketing' },
                                                { text: 'Staff', value: 'staff' },
                                                { text: 'Accountant', value: 'accountant' },
                                                { text: 'HRM', value: 'hrm' },
                                                { text: 'Management', value: 'management' },
                                                { text: 'Agency', value: 'agency' },
                                            ]}
                                        />
                                    </div> */}
                                    {[
                                        'project_id','user_id','date','total_share','have_to_pay_amount','paid','reference_user_id','status'
                                    ].map((i) => (
                                        <div className="form-group form-vertical">
                                            <Input name={i} />
                                        </div>
                                    ))}

                                </div>
                            </div>

                            <div className="form-group form-vertical">
                                <label></label>
                                <div className="form_elements">
                                    <button className="btn btn_1 btn-outline-info">
                                        submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Create;
