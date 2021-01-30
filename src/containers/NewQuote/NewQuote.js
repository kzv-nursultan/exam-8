import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import {Button, Input} from 'reactstrap';
import Footer from '../../components/UI/Footer/Footer';
import NavBar from '../NavBar/NavBar';
import axiosQuote from '../../axiosQuote';
import {CATEGORIES} from '../../constant';

const NewQuote = () => {
    const history = useHistory();
    const [category, setCategory] = useState(null);
    const [newQuote, setNewQuote] = useState({
        author:'',
        text:''
    });

    

    const options = (
        (CATEGORIES.map(category=>(
            <option
            key={category.id}
            value={category.id}>
                {category.title}
            </option>
        )))
    );

    const changeHandler = e => {
        setCategory(e.target.value);
    };

    const newQuoteHandler = e => {
        const name = e.target.name;
        const value = e.target.value

        setNewQuote(prevState=>({
            ...prevState,
            [name]: value,
            category: category
        }));
    };

    const SubmitHandler = async e => {
        e.preventDefault();

        const Quote = {
            ...newQuote,
        };

        try {
            await axiosQuote.post('/quotes.json', Quote)
        } finally {
            history.push('/')
        }

    }

    return(
       <div>
           <NavBar/>
           <div className='container'>
            <div className='m-3'>
                Choose category:
                <Input type="select" name="select" id="exampleSelect" 
                onChange={changeHandler} style={{width:'200px'}} required>
                    {options}
                </Input>
            </div>
            <div className='m-3'>
                <form className='d-flex flex-column' 
                style={{width:'350px'}}
                onSubmit={SubmitHandler}>

                    Author:<input 
                    name='author'
                    value={newQuote.author}
                    onChange={newQuoteHandler}/>

                    Quote Text:<textarea 
                    name='text'
                    value={newQuote.text}
                    onChange={newQuoteHandler}/>

                    <Button type='submit' color='success'>
                        <strong>
                            SAVE
                        </strong>
                    </Button>

                </form>
            </div>
           </div>
           <Footer/>
       </div>
    );
};

export default NewQuote;