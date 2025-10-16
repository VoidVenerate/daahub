import React from 'react'
import CategoryPage from '../../Components/CategoryPage/CategoryPage'
import Navbar from '../../Components/Navbar/Navbar'
import { useState } from 'react'

const Category = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div>
        <Navbar onSearch={setSearchTerm} />
        <CategoryPage searchTerm={searchTerm} />
    </div>
  )
}

export default Category