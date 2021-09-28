import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleShow(){
        console.log(this.state.show)
        this.setState(({
            show: true
        }))
        console.log(this.state.show)
    }
    handleClose(){
        console.log('close')
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div style={{margin: '8% 0'}}>
                <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose} style={{marginTop: '5%'}}>
                    <Modal.Header>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Home;