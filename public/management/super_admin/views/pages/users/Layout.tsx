import React from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import setup from './config/setup';
export interface Props {}

const Layout: React.FC<Props> = (props: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParameter = searchParams.get("role");
    const url = window.location.href;
    console.log(url.split('/'))
    return (
        <div className="management_root no_border">
            <div className="management_heading page-header pb-0">
                {/* <h3 className="layout_heading">{setup.layout_title }</h3> */}
                {/* <h3 className="layout_heading">{searchParameter?searchParameter+' List':setup.layout_title}</h3> */}
                <h3 className="layout_heading">{searchParameter?searchParameter+' List':url.split('/')[5]=='create'?'User Management':''}</h3>
            </div>
            <div className="management_content_root">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;
