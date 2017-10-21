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
        if (nextProps.open) {
            this.setState({ open: nextProps.open });
        }
    }

    handleOk = () => {
        const { okCallback } = this.props;
        if (okCallback) {
            okCallback();
        }
        this.setState({ open: false });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { title = '', message = '', ...other } = this.props;

        return (
            <div>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
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
                        <Button onClick={this.handleRequestClose} color="primary">
                            Отменить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmDialog;