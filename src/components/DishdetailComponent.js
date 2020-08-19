import React, {Component} from 'react';
import {Card, Button, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,Modal ,ModalHeader ,ModalBody, Row, Col, Label } from 'reactstrap';
import {Link} from 'react-router-dom'
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
 function RenderDish({dish}) {
    
        return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
        );
}

function RenderComments({comments}){

    const commentList = comments.map((comment) => {
       
        return( 

          <div>
             <li className="my-3">  
                <p>{comment.comment}</p>
                <p className="my-3">-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric',month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
             </li>
          </div>
        );
    });
       
        return(
       
       <div> 
           {/* this is the comment list being returned by the function*/}  
            <ul>
                <h4>Comments</h4>
                {commentList}
                <CommentForm/>
            </ul>
        </div>
        
        );
  
}
     
class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: true
            
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            
            })
        }
  
    render(){
        return(
            <div className="container">
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-sign-in fa-lg"></span>Submit Comment
            </Button>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    
                                <Row className="form-group">
                                    <Col >
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>   
                                        </Control.select>
                                    </Col>
                                </Row>            
                                <Row className="form-group">
                                <Col>
                                    <Label htmlFor="name">First Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                            />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                               
                           
                            <Row className="form-group">
                                
                                <Col>
                                <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                  </ModalBody>
          </Modal>
           </div>
        );
        };
}

        const DishDetail = (props) => {
    if(props.dish != null) {

            return (
            <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1"><RenderDish dish={props.dish} /></div>
                        <div className="col-12 col-md-5 m-1"><RenderComments comments ={props.comments}/></div>
                    </div>
            </div>
            );

            }     
   
    else
    {
        return(
            <div></div>
        );
    }
 }

export default DishDetail;
