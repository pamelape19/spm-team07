import {React, Component } from 'react';
import { Card } from 'react-bootstrap';
import bg from "../../resources/courseCardBg.png";

class CourseCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            allClasses: [],
            numClasses: 0
        }
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5000/classes')
        .then(res => res.json())
        .then(result => {
            this.setState({
                allClasses: result.data.classes
            })
            const classesInArray = this.state.allClasses.map((classesInArray)=>{
                if ( classesInArray.Course_name === this.props.name ){
                    this.setState ({ numClasses: this.state.numClasses + 1
                })

                }
            })
        }
        )
    }
    render(){
        const { link, name }= this.props;
        return(
            <div>
                <a style={{ cursor: 'pointer'}} href={ link }>
                    <Card style={{ width: '16rem', boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.26)', height: '18rem' }}>
                        <Card.Img variant="top" src={ bg } />
                        <div style={{ padding: 20 }}>
                            <Card.Title style={{textAlign: 'left'}}>{ name }</Card.Title>
                            <Card.Text>Classes offered - { this.state.numClasses }</Card.Text>
                        </div>
                    </Card>
                </a>
            </div>
        )
    }
}

export default CourseCard;