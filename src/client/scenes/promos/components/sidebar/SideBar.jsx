import * as React from "react";
import Col from "react-bootstrap/es/Col";
import {Link} from "react-router-dom";
import Button from "../../../../components/button/Button";
import Card from "../../../../components/card/Card";
import Label from "../../../../components/label/Label";
import {Checkbox, FormGroup, Overlay, OverlayTrigger, Popover, Button as BootstrapButton, Row, FormControl} from "react-bootstrap";
import FontAwesome from 'react-fontawesome';
import {translate} from "react-i18next";
import Separator from "../../../../components/separator/Separator";

@translate(['promos'])
export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.filter = this.props.filter;
    }

    render() {
        const t = this.props.t;

		const allBreedsPopover = (
            <Popover>
                <FormGroup onChange={this.props.onFilterChanged}>
					{
						this.props.breeds && this.props.breeds.map((item, index) => (
                            <Checkbox value={item} name="breeds" checked={this.filter.breeds.indexOf(item) !== -1}>
								{item}
                            </Checkbox>
						))
					}
                </FormGroup>
            </Popover>
		);

		const allCitiesPopover = (
            <Popover>
                <FormGroup onChange={this.props.onFilterChanged}>
					{
						this.props.cities && this.props.cities.map((item, index) => (
                            <Checkbox value={item} name="cities" checked={this.filter.cities.indexOf(item) !== -1}>
								{item}
                            </Checkbox>
						))
					}
                </FormGroup>
            </Popover>
		);


        return (
            <Row>
                <Col md={12}>
                    <Link to="/promos/new">
                        <Button accent="red" className="w-100 text-white">
                            <FontAwesome name="plus" />
                            {t('CREATE_PROMO')}
                        </Button>
                    </Link>
                </Col>
                <Col md={12}>
                    <Card className="mt-2 p-3">

                        <Label accent="blue" className="p-2">{t('FILTERS')}</Label>
                        <Separator className="mt-2" />



                        <Label className="mt-3">{t('SELECT_PET')}</Label>
                        <FormControl name="animal"
                             onChange={this.props.onFilterChanged}
                             componentClass="select">
							{
								this.props.animals && this.props.animals.map((item, index) => (
                                    <option value={item} name="animal" selected={this.filter.animal === item}>{item}</option>
								))
							}
                        </FormControl>


                        <Label className="mt-3">{t('SELECT_BREED')}</Label>
                        <FormGroup onChange={this.props.onFilterChanged}>
                            {
                                this.props.breeds && this.props.breeds.slice(0, 4).map((item, index) => (
                                    <Checkbox value={item} name="breeds" checked={this.filter.breeds.indexOf(item) !== -1}>
                                        {item}
                                    </Checkbox>
                                ))
                            }
                        </FormGroup>
                        <OverlayTrigger trigger="click" rootClose placement="left" overlay={allBreedsPopover} container={this}>
                            <Button>{t('ALL_BREEDS')}</Button>
                        </OverlayTrigger>




                        <Label className="mt-3">{t('LOCATION')}</Label>
                        <FormGroup onChange={this.props.onFilterChanged}>
                            {
								this.props.cities && this.props.cities.slice(0, 4).map((item, index) => (
                                    <Checkbox value={item} name="cities" checked={this.filter.cities.indexOf(item) !== -1}>
                                        {item}
                                    </Checkbox>
								))
                            }
                        </FormGroup>
                        <OverlayTrigger trigger="click" rootClose placement="left" overlay={allCitiesPopover} container={this}>
                            <Button>{t('ALL_CITIES')}</Button>
                        </OverlayTrigger>





                    </Card>
               </Col>
            </Row>
        )
    }

}