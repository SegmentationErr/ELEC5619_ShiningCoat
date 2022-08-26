import axios from 'axios';
import React, { Component } from 'react';

class TestPage extends Component {
    constructor(props) {
        super(props);

        axios.get('http://localhost:8080/users/all')
        .then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                this.setState({
                    users: res.data
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    state = {
        users: []
    }

    render() { 
        return (
            <>
                {this.state.users.map((user, key) => {
                    return <li key={key}>
                            <i>{user.id}</i>,
                            <i>{user.username}</i>,
                            <i>{user.email}</i>,
                            <i>{user.password}</i>,
                            <i>{user.role}</i>
                           </li>
                })}
            </>
        );
    }
}
 
export default TestPage;