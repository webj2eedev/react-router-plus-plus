import React from 'react';

export default function NeedUserAuthorized(props) {
    const { children, route} = props;
    const { routes } = route;

    return React.cloneElement(children, {
        ...children.props,
        route:{
            ...route,
            routes
        }
    });
}
