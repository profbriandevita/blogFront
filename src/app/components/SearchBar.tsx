import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Article } from '@/types/article';






  interface SearchBarProps {
    articles: Article[];
    setFilteredArticles?: (articles: Article[]) => void
  }
  
  






export const SearchBar: React.FC<SearchBarProps> = ({articles, setFilteredArticles}) => {

    const [query, setQuery] = useState('')


    useEffect(() => {
       if (setFilteredArticles) {
        if (query === '' ){
          setFilteredArticles(articles)
      } else {
          setFilteredArticles(
              articles.filter((article: Article) => 

               article.title.toLowerCase().includes(query.toLocaleLowerCase()) || 
               article.content.toLowerCase().includes(query.toLocaleLowerCase())

              )
          )
      }
       }
        


    }, [query, articles, setFilteredArticles])
    

  return (
    <div className='flex-grow'>
    <div className='relative max-w-md mx-auto'>
        <FontAwesomeIcon icon={faSearch} className='text-white absolute lef-3 top-2 h-5 w-5 ml-3' />
            <input 
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder='Buscar articulos..'
            className='bg-gray-300 text-black rounded-full pl-10 pr-4 py-2 w-full focus:outline-none'
            
            />
        </div>

        </div>
  )
}
