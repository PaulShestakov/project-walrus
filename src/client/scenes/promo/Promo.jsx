import React from 'react';
import {Route, Switch} from "react-router-dom";
import Promos from "../../containers/Promos";
import NewPromo from "../../containers/NewPromo";

class Promo extends React.Component {
    render() {

        return (
            <Switch>

                <Route exact path="/promos" component={Promos}/>
                <Route path="/promos/new" component={NewPromo}/>
                <Route path="/promos/:id"/>
            </Switch>
        );
    }
}

export default Promo;

