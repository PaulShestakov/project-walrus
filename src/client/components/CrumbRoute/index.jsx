import React from 'react';
import { Route } from 'react-router-dom';
import { Breadcrumb } from 'react-breadcrumbs';


export default function CrumbRoute({ component: Component, render, ...props }) {
	return (
		<Route {...props} render={routeProps => (
			<Breadcrumb data={{title: props.title, pathname: props.path}}>
				{Component ? <Component {...routeProps} /> : render(routeProps)}
			</Breadcrumb>
		)}/>
	);
}
