import { React, Component } from 'react';
import { Container, Nav } from 'react-bootstrap';
import CompletedCardListItem from '../../components/cards/CompletedCardListItem';

class LearnersCompleted extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginEmailState: "samueltan@allinone.com",
            completedClasses: [],
            noClasses: false,
        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5012/' + this.state.loginEmailState)
        .then(res => {
            // show 'no completed classes' if 404 returned
            if (!res.ok){
                this.setState({
                    noClasses: true
                })
            }
            else{
                res.json()
                .then(result => {
                let allCompletedClasses = result.data.completedClasses
                allCompletedClasses.map((completedClass) => (
                    this.setState({
                        completedClasses: [...this.state.completedClasses, {
                            class_num: completedClass.class_num,
                            course_name: completedClass.course_name,
                            date_completed: completedClass.date_completed,
                        }]
                    })
                ))
                })
            }
        })
    }
    render(){
        let classShown;
        if (this.state.noClasses === false){
            classShown = <div>
                { this.state.completedClasses.map((completedClass) => (
                    <CompletedCardListItem view="learners" courseName={ completedClass['course_name'] } classNum={ completedClass['class_num'] } dateCompleted={ completedClass['date_completed'] }/>
                ))}
            </div>
        }
        else{
            classShown = <h5>No completed classes.</h5>
        }
        return(
            <div style={{ margin: '8% 0' }}>
                <Container>
                    <h1>Courses</h1>
                    <Nav variant="tabs" defaultActiveKey="/learners-completed" style={{ margin: 10 }}>
                    <Nav.Item>
                        <Nav.Link href="/learners-home" style={{ color: '#00000080' }}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-enrolled" style={{ color: '#00000080' }}>Enrolled</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/learners-completed" style={{ color: '#000000', fontWeight: 'bold' }}>Completed</Nav.Link>
                    </Nav.Item>
                    </Nav>

                        { classShown }
                    
                </Container>
            </div>
        )
    }
}

export default LearnersCompleted;