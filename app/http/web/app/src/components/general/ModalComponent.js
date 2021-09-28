import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleShow(){
        this.setState(({
            show: true
        }))
    }
    handleClose(){
        this.setState({
            show: false
        })
    }

    render() {
        const { btnName, title, body } = this.props;
        return (
            <div style={{ margin: '8% 0' }}>
                <Button variant="primary" onClick={ this.handleShow }>
                    { btnName }
                </Button>
                <Modal show={ this.state.show } onHide={ this.handleClose } style={{ marginTop: '5%' }}>
                    <Modal.Header>
                        <Modal.Title>{ title }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{ body }</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ this.handleClose }>
                            Close
                        </Button>
                        <Button variant="primary" onClick={ this.handleClose }>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalComponent;