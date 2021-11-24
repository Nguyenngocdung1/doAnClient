import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import React from 'react';
import './App.css';
import { getBooks } from './graphql-client/query';
import Router from './routers';

const App:React.FC = () => {
  

  const Booklist = () => {
    const {loading, error, data} = useQuery(getBooks)

    if(loading) {
      return <Spin size="large" />
    }
    if(error) {
      return <p>error book ...</p>
    }
    console.log(data)
  }

  return (
      <div className="App">
       <Router />
      </div>
  );
}

export default App;
