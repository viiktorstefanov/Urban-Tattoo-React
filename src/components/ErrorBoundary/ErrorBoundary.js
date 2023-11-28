import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor() {
        super()

        this.state = {
                hasError: false,
                error: null,
                errorInfo: null,     
        };
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
        }
    }

    componentDidCatch(error , errorInfo) {
        console.log(error.toString());
        console.log(errorInfo.componentStack);
        this.setState({
            hasError: true,
            error: error.toString(),
            errorInfo: errorInfo.componentStack,
          });
    }

    render() {

        if(this.state.hasError) {
            return this.props.FallbackComponent;
        }

        return this.props.children;
    };
};