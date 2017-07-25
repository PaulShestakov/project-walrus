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
    }

    render() {
        const t = this.props.t;
        return (
            <Row>
                <Col md={12}>
                    <Link to="/newPromo">
                        <Button accent="red" className="w-100 text-white">
                            <FontAwesome name="plus" />
                            {t('CREATE_PROMO')}
                        </Button>
                    </Link>
                </Col>
                <Col md={12}>
                    <Card className="mt-2 py-2">
                        <Col md={12}>
                            <Label accent="blue" className="px-1 text-white">{t('FILTERS')}</Label>
                            <Separator className="mt-2" />
                        </Col>
                        <Col md={12} className="mt-2">
                            <Label >{t('SELECT_PET')}</Label>
                            <FormControl name="animal"
                                         onChange={this.props.onFilterChanged}
                                         selected={}
                                         componentClass="select">
                                {
                                    this.props.animals && this.props.animals.map((item, index) => (
                                        <option value={item} name={item}>{item}</option>
                                    ))
                                }
                            </FormControl>
                        </Col>
                        <Col md={12} className="mt-2">
                            <Label >{t('SELECT_BREED')}</Label>
                            <FormGroup onChange={this.props.onFilterChanged}>
                                {
                                    this.props.breeds && this.props.breeds.map((item, index) => (
                                        <Checkbox value={item} name="breed">{item}</Checkbox>
                                    ))
                                }
                            </FormGroup>
                        </Col>
                        <Col md={12} className="mt-2">
                            <Label >{t('LOCATION')}</Label>
                            <FormControl name="city" onChange={this.props.onFilterChanged} componentClass="select">
                                {
                                    this.props.cities && this.props.cities.map((item, index) => (
                                        <option value={item} name={item} >{item}</option>
                                    ))
                                }
                            </FormControl>
                        </Col>

                        {/*<OverlayTrigger trigger="click" placement="left" overlay={petTypesPopover} container={this}>
                            <BootstrapButton>Select pet type</BootstrapButton>
                        </OverlayTrigger>


                        <Button onClick={this.handleClick}>
                            Holy guacamole!
                        </Button>

                        <Overlay
                            show={this.state.show}
                            target={this.state.target}
                            placement="bottom"
                            container={this}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained" title="Popover bottom">
                                <strong>Holy guacamole!</strong> Check this info.
                            </Popover>
                        </Overlay>
                        */}
                    </Card>
               </Col>
            </Row>
        )
    }

}