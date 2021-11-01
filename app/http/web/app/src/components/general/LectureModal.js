import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class LectureModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            selectedFile: null,
            isFilePicked: false,
            isSelected: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
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

    changeHandler(e){
        this.setState({
            selectedFile: e.target.files[0],
            isSelected: true
        })
    }

    handleSubmission(){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        fetch(
            'http://127.0.0.1:5007/course-material/' + this.props.courseName +'/' + this.props.classNum + '/' + this.props.chapterNum,
            {
                method: 'POST',
                body: formData,
            }
        )
        return
    }

    render() {
        const { btnName } = this.props;
        const { isSelected, selectedFile } = this.state;
        return (
            <div style={{ margin: '8% 0' }}>
                <Button variant="primary" onClick={ this.handleShow }>
                    { btnName }
                </Button>
                <Modal show={ this.state.show } onHide={ this.handleClose } style={{ marginTop: '12%' }}>
                    <form>
                    <Modal.Body style={{padding: '10% 5%'}}>
                    <div className="course-design-modal-body">
                        <input type="file" 
                                name = 'inputFile' 
                                className="course-design-browse-btn" 
                                // id={ 'course-design' + uploadId } 
                                onChange={ this.changeHandler }
                        />
                        <br/>
                        {isSelected ? (
                            <div>
                                File selected: { selectedFile.name }
                            </div>
                        ): (
                            <div>
                                <b>Note: </b>
                                Please select a file.
                            </div>
                        )}
                     
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ this.handleClose }>
                            Close
                        </Button>
                        <Button variant="primary" onClick={ ()=>{ this.handleClose(); this.handleSubmission(); } }>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default LectureModal;