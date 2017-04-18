import React, {Component} from 'react'
import StateCounter from './StateCounter'
import PageHeader from 'react-bootstrap/lib/PageHeader'

class CounterPage extends Component {
    render(){
        return (
            <div>
                <PageHeader>Counters</PageHeader>
                <h3>State Counter</h3>
                <StateCounter />
            </div>
        );
    }
}

export default CounterPage;