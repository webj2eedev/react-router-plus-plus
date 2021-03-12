import React from 'react';
import { render, screen } from '@testing-library/react';

// app
import routes from "./config/routes"
import {renderRoutes, Router} from '../index';
import { createMemoryHistory } from 'history'

describe('mxroutes', () => {

    test('命令式路由跳转', async () => {
        const history = createMemoryHistory();

        render(<Router history={history}>{renderRoutes(routes)}</Router>);

        history.push("/login");
        expect(screen.getByText('Login')).toBeInTheDocument();

        history.push("/404");
        expect(screen.getByText('404')).toBeInTheDocument();

        //测试错误边界
        history.push("/error");
        expect(screen.getByText('出错了')).toBeInTheDocument();
        
        // 测试重定向 - root
        history.push("/");
        expect(screen.getByText('Home')).toBeInTheDocument();

        // 测试重定向
        history.push("/sysmng");
        expect(screen.getByText('UserMng')).toBeInTheDocument();

        history.push("/sysmng/usermng");
        expect(screen.getByText('UserMng')).toBeInTheDocument();

        // 测试相对路径路由
        history.push("/pwdmng");
        expect(screen.getByText('PwdMng')).toBeInTheDocument();

        // 测试相对路径路由
        history.push("/sysmng/rolemng");
        expect(screen.getByText('RoleMng')).toBeInTheDocument();

        // 测试二级有子路由，但是没有component，三级路由是否正常渲染
        history.push("/secondwithoutcomponent/rolemng");
        expect(screen.getByText('RoleMng')).toBeInTheDocument();
    });

    // test('路由传参', async () => {
    //     const history = createMemoryHistory({
    //         initialEntries:["/"]
    //     });
    //
    //     render(<Router history={history}>{renderRoutes(routes)}</Router>);
    //
    //     history.push("/sysmng/rolemng/someroleid/somerolename");
    //     expect(screen.getByText('UserMng')).toBeInTheDocument();
    // });
});
