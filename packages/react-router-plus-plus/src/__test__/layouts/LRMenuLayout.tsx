import React from 'react';
import { Link, useLocation } from '../../index';

export default function UserSettings(props) {
    const { route, children } = props;

    const location = useLocation();

    return (
        <div>
            <ul>
                {route.routes
                    .filter(({ redirect }) => !redirect)
                    .map(route => {
                        return (
                            <li key={route.path} className={location.pathname === route.path ? 'active' : ''}>
                                <Link to={route.path}>{route.name}</Link>
                            </li>
                        );
                    })}
            </ul>
            <div>
                {children}
            </div>
        </div>
    );
}
