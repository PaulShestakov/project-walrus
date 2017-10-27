import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class ConfirmDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.open === 'boolean') {
            this.setState({ open: nextProps.open });
        }
    }

    handleOk = () => {
        const { okCallback } = this.props;
        if (okCallback) {
            okCallback();
        }
    };

    handleClose = () => {
        const { closeCallback } = this.props;
        if (closeCallback) {
            closeCallback();
        }
    };

    render() {
        const { title = '', message = '', ...other } = this.props;

        return (
            <Dialog open={this.state.open} onRequestClose={this.handleClose}>
                <DialogTitle>{ title }</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { message }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleOk} color="primary">
                        Да
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Отменить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ConfirmDialog;