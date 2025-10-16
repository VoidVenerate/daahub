import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import NewsPage from '../../Components/newsPage/newsPage'
import { useState } from 'react'

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('')
  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <NewsPage searchTerm={searchTerm} />
    </>
  )
}

export default Home