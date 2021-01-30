import React, {useState, useEffect} from 'react';
import { Input, Button } from 'reactstrap'
import axiosQuote from '../../axiosQuote';
import QuoteHandler from '../../components/QuoteHandler/QuoteHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

export const CATEGORIES = [
    {title:'All', id:null},
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous People', id: 'famous-people'},
    {title:'Saying', id:'saying'},
    {title:'Humour', id:'humour'},
    {title:'Motivational', id:'motivational'}
    ];

const Content = () => {
    const [category, setCategory] = useState(null);
    const [quotesList, setQuoteList] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true)
            try{
                const response = await axiosQuote.get('/quotes.json');
                setQuoteList(response.data);
            } finally {
                setLoading(false);
            };
            
        };
        fetchData().catch(console.error);
    },[]);


    const changeHandler = e => {
        setCategory(e.target.value);
    };

    const sortHandler = async () => {
        if(category === 'All') {
            console.log(category);
            const response = await axiosQuote.get('/quotes.json');
            console.log(response.data);
            setQuoteList(response.data);
        } else {
            console.log(category)
            console.log('/quotes.json?orderBy="category"&equalTo=' + '"' +category + '"')
            const response = await axiosQuote('/quotes.json?orderBy="category"&equalTo=' + '"' +category + '"');
            console.log(response);
            setQuoteList(response.data);
        }
    };

    const options = (
        (CATEGORIES.map(category=>(
            <option
            key={category.id}
            value={category.id}>
                {category.title}
            </option>
        )))
    );

    let content = (
        (Object.keys(quotesList).map(key=>(
            <QuoteHandler
            key={key}
            author={quotesList[key]['author']}
            text={quotesList[key]['text']}
            category={quotesList[key]['category']}
            id={key}
            quotesList={quotesList}
            setQuoteList={setQuoteList}/>
        )))
    );


    if(loading) {
        content = <Spinner/>
    }

    return(
        <div className='m-2 d-flex'>
            <div className='m-3 text-center' >
                Choose category:
                <Input type="select" name="select" id="exampleSelect" 
                onChange={changeHandler} style={{width:'200px'}} required>
                    {options}
                </Input>
                <Button color='danger' onClick={sortHandler} className='m-2'>
                        Sort
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    );
};

export default Content;