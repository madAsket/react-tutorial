import React, {Component} from 'react'
import PropTypes from "prop-types"

import "./HelloWorldPage.css";

const propTypes = {
    initialName:PropTypes.string
};

const defaultProps = {
    initialName:"Anonymous"
};

class HelloWorldPage extends Component {
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.renderGreetingWidget = this.renderGreetingWidget.bind(this);

        this.state = {
            name : this.props.initialName,
            touched : false,
            greetingWidget: () => null
        };

    }
    handleNameChange(val){
        const name = val.target.value;
        this.setState({touched:true});
        if(name.length === 0){
            this.setState({name:this.props.initialName});
        }else{
            this.setState({name});
        }
    }
    renderGreetingWidget(){
        if(!this.state.touched){
            return null;
        }
        return (
            <div>
                <hr/>
                <p>Здравствуйте {this.state.name}</p>
            </div>
        );
    }
    render(){
        return (
          <div className="App">
              <h1>Hello world</h1>
              <div>
                  <p>Enter name:</p>
                  <div><input onChange={this.handleNameChange} /></div>
                  {this.renderGreetingWidget()}
              </div>
          </div>
        );
    }
}

HelloWorldPage.propTypes = propTypes;
HelloWorldPage.defaultPorps = defaultProps;

export default HelloWorldPage;