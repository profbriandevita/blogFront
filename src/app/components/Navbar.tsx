
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faSignInAlt, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { SearchBar } from './SearchBar';
import { Article } from '@/types/article';
import { useArticles } from '@/context/ArticleProvider';
import { useAuth } from '@/context/AuthProvider';

  

interface NavbarProps {
    articles: Article[];
    setFilteredArticles?: (articles: Article[]) => void;
    onOpenCreateModal: () => void;

}


const Navbar: React.FC<NavbarProps> = ({articles, setFilteredArticles, onOpenCreateModal}) => {
    const {fetchFavorites} = useArticles()
    const {isAuthenticated, logout, username} = useAuth()



    return (
        <nav className='bg-indigo-600 text-white p-4'>

                <div className='container mx-auto flex justify-between items-center'>
                            <a href="/" className='text-xl font-bold'>Mi Blog</a>


                            <SearchBar
                            articles={articles}
                            setFilteredArticles={setFilteredArticles}
        
                            />

                        <ul className='flex space-x-6 items-center'>
                            {
                                isAuthenticated && (
                              <>

                                {
                                    username && (
                                        <li className='flex items-center'>
                                            <FontAwesomeIcon icon={faUser} className='mr-2 text-lg'/>
                                            <span className='mr-10 h-6 w-6'>{username}</span>
                                        </li>
                                    )
                                }

                                 <button onClick={fetchFavorites} className='flex items-center hover:text-gray-300'>
                                    <FontAwesomeIcon icon={faStar} className='mr-2 h-6 w-6'/>
                                    Favoritos
                                 </button>
                                 
                                <li>
                                    <button onClick={onOpenCreateModal} className='flex items-center hover:text-gray-300'> 
                                    <FontAwesomeIcon icon={faPlusCircle} className='mr-2 h-6 w-6' />
                                    Crear Ariculo
                                    </button>
                                </li>
                              
                              
                              </>


                                ) 
                            }  
                             {!isAuthenticated ? (

                                <li>
                                    <Link href="/pages/login" className='flex items-center hover:text-gray-300'> 
                                    <FontAwesomeIcon icon={faSignInAlt} className='mr-2 h-6 w-6' />
                                    Iniciar Sesion
                                    </Link>
                                </li>
                             ) : (
                                <li>
                                    <button
                                    onClick={logout}
                                    className='flex items-center hover:text-gray-300'> 
                                    <FontAwesomeIcon icon={faSignInAlt} className='mr-2 h-6 w-6' />
                                    Cerrar Sesion
                                    </button>
                                </li>
                             )}
                        </ul>
                </div>

        </nav>
    )
}

export default Navbar;