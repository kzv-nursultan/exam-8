import React, {useState, useEffect} from 'react';
import axiosQuote from '../../axiosQuote';
import Footer from '../../components/UI/Footer/Footer';
import NavBar from '../NavBar/NavBar';
import Spinner from '../../components/UI/Spinner/Spinner';
import {CATEGORIES} from '../../constant';
import { Button, Input } from 'reactstrap';

const EditQuote = props => {
    const [quote, setQuote] = useState({
        author:'',
        text:'',
        category:''
    });
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');

    useEffect(()=>{
        setLoading(true);
        const getData = async () => {
           try {
            const response = await axiosQuote.get('/quotes/' + props.match.params.id + '/.json');
            setQuote(response.data);
           } finally {
               setLoading(false);
           }
        };        
        getData().catch(console.error);
    },[props.match.params.id]);

    const categoryHandler = e => {
        setCategory(e.target.value);
    }

    const quoteEditer = e => {
        const name = e.target.name;
        const value = e.target.value

        setQuote(prevState=>({
            ...prevState,
            [name]: value,
            category: category
        }));
    };

    

    const submitHandler = async () => {
        setLoading(true);

        const newQuote = {
            ...quote,
        };

        console.log(newQuote);
        try {
            await axiosQuote.put('/quotes/' + props.match.params.id + '/.json', newQuote)
        } finally {
            setLoading(false);
        };
    };

    let list = (
        <div style={{width:'300px'}} className='m-auto'>
            <Input type='select' 
            name="select" id="exampleSelect"  
            onChange={categoryHandler}>
                {CATEGORIES.map(category=>(
                    <option
                    key={category.id}
                    value={category.id}>
                        {category.title}
                    </option>
                ))}
            </Input>
            <div>
                <form onSubmit={submitHandler}>
                    Author:
                    <input type='text' name='author'  
                    value={quote.author}
                    onChange={quoteEditer}/>
                    Quote Text:
                    <textarea name='text'
                    value={quote.text}
                    onChange={quoteEditer}/>
                    <Button type='submit'>
                        Edit
                    </Button>
                </form>
            </div>
        </div>
    );

    if(loading) {
        list = <Spinner/>
    }

    return(
        <div>
            <NavBar/>
                <div className='container text-center m-3'>
                    {list}
                </div>
            <Footer/>
        </div>
    );
};

export default EditQuote;