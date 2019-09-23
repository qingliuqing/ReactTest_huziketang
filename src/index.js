import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Bar extends React.Component {
    componentDidMount() {
        console.log('componentDidMount');
    }
    render() {
        const { idx } = this.props;
        return (
            <div>
                in Bar: { idx }
            </div>
        );
    }
}

class App extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            idx: 1
        };
    }

    handleClick = () => {
        this.setState(state => ({
            idx: state.idx + 1
        }));
    }

    render() {
        return (
            <div>
                <div>
                    { this.state.idx }
                    <button onClick={this.handleClick}>
                        add
                    </button>
                </div>
                <div>
                    <Router>
                        <Route render={
                            () => (
                                <Bar idx={ this.state.idx}/>
                            )
                        } />
                        {/* <Route component={
                            () => (
                                <Bar idx={ this.state.idx}/>
                            )
                        } /> */}
                    </Router>
                </div>
            </div>
        );
    }
}

  ReactDOM.render(
    <App />,
      document.getElementById('root')
    );

// ReactDOM.render(
//   <Provider store={store}>
//     <CommentApp />
//   </Provider>,
//   document.getElementById('root')
// );