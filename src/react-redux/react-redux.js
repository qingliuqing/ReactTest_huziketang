import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { directive } from '@babel/types';

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        } 

        constructor() {
            super();
            this.state = { allProps: {} };
        }
        componentWillMount() {
            const { store } = this.context;
            this._updateProps();
            store.subscribe(() => this._updateProps());
        }
        _updateProps() {
            const { store } = this.context
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}; // 防止 mapStateToProps 没有传入
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}; // 防止 mapDispatchToProps 没有传入
            this.setState({
                allProps: { // 整合普通的 props 和从 state 生成的 props
                ...stateProps,
                ...dispatchProps,
                ...this.props
                }
            })
        }
        render() {
            return <WrappedComponent {...this.state.allProps} />
        }
    }

    return Connect;
}

export class Provider extends Component {
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }

    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return {
            store: this.props.store
        };
    }

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}