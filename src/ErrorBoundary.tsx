import React from 'react';

export interface ErrorBoundaryState {
    error: any;
}

export default class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error) {
        this.setState({
            error: error,
        })
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <pre style={{ color: 'red', fontSize: "20px" }}>{this.state.error.stack}</pre>
                </div>
            )

        }
        return this.props.children;
    }
}
