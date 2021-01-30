import React, {useState} from 'react';
import { Alert, Button } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import axiosQuote from '../../axiosQuote';
import Spinner from '../UI/Spinner/Spinner';

const QuoteHandler = props => {
    let history = useHistory();
    const [loading, setLoading] = useState(false);

    const deleteQuote = async () => {
        setLoading(true);
        try {
            await axiosQuote.delete('/quotes/' + props.id + '/.json');
        } finally {
            const value = {...props.quotesList};
            delete value[props.id];
            (props.setQuoteList)(value);            
            setLoading(false);
        };
    };

    const EditHandler = () => {
        console.log(props.id);
        history.push({
            pathname: '/edit/' + (props.id)
        })
    };

    let list = (
        <Alert color="warning">
        <h4 className="alert-heading">Author: {props.author}</h4>
        <p>
          {props.text}
        </p>
        <hr />
        <p className="mb-0">
         Category: {props.category}
        </p>
        <p>
            <Button color="danger" className='m-2' onClick={deleteQuote}>
                Delete
            </Button>
            <Button color="success" onClick={EditHandler}>
                Edit
            </Button>
        </p>
      </Alert>
    );

    if(loading) (
        list = <Spinner/>
    )


    return(
    <div>
        {list}
    </div>
    );
};

export default QuoteHandler;