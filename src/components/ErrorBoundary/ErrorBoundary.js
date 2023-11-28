import { Component } from 'react';
import Problem from './Problem';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)

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
            return <Problem errors={this.state} />;
        }

        return this.props.children;
    };
};