import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);
            this.state = {
            }
 }

 renderDish(dish) {
    if (dish != null)
    {
        return(
           <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
        );
    }
    else
    {
        return(
            <div></div>
        );
    }
}

renderComments(dish){
    if (dish != null)
{
    const commentList = this.props.dish.comments.map((comment) => {
       
        return( 

          <div>
        
             <li className="my-3">{comment.comment}</li>
             <li className="my-3">-- {comment.author}, <time>{comment.date}</time></li>
          
          </div>
        );
    });
       
        return(
        <div>
        <ul>
        <h4>Comments</h4>
        {commentList}</ul>
        </div>
        );
   
 

}

    else {
        return(
            <div></div>
        );
    }
}
            render()
            {

        return (
        <div className="row">
                <div className="col-12 col-md-5 m-1">
                
               {this.renderDish(this.props.dish)}

                </div>

                <div className="col-12 col-md-5 m-1 d-flex">

                        {this.renderComments(this.props.dish)}

                </div>
         </div>
        );

            
   
}
}

export default DishDetail;
