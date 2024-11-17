
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart as fasHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';
import { CardProps } from '@/types/article';
import { useAuth } from '@/context/AuthProvider';
import { useArticles } from '@/context/ArticleProvider';
import Swal from 'sweetalert2'




const Card: React.FC<CardProps> = ({ id, deleteArticle }) => {
      const { isAuthenticated, userId} = useAuth()
      const {articles, toggleFavorite} = useArticles()
      const article = articles.find(article => article.id === id)
      
      if (!article) return null
    

      const isAuthor = userId === article.user_id;
  
      
   
    

      const confirmDelete = ( ) => {
        Swal.fire({
          title: '¿Estas seguro?',
          text: '¡No podras revertir esto!',
          icon: 'warning',
          showCancelButton:true,
          confirmButtonColor:'#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo!'
        }).then((result)=> { {

        }
          if (result.isConfirmed) {
            deleteArticle(article.id)
            Swal.fire({
              title: "Eliminado",
              text: 'El articulo ha sido eliminado',
              icon: 'success'
            })
          }

        })
      }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
 
      <div className="relative overflow-hidden h-64">
        <img 
          src={article.image_url} 
          alt={article.title} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>


      <div className="absolute top-4 right-4 flex space-x-2">
        {isAuthenticated && (
           <>
            {isAuthor &&  (
                 <button
                 onClick={confirmDelete}
                 className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:bg-white transition-all duration-300 group"
               >
                 <FontAwesomeIcon
                   icon={faTrash}
                   className="h-5 w-5 text-red-500 group-hover:scale-110 transition-all duration-300"
                 />
               </button>
            )}

            <button
              onClick={() => toggleFavorite(id)}
              className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:bg-white transition-all duration-300 group"
            >
              <FontAwesomeIcon
                icon={article.isFavorite ? fasHeart : farHeart}
                className={`h-5 w-5 ${
                  article.isFavorite ? 'text-red-500' : 'text-gray-600'
                } group-hover:scale-110 transition-all duration-300`}
              />
            </button>
           
           
           </>
        )}
       
      </div>


      <div className="p-6 relative">
      
        <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full mb-4">
          Blog
        </span>
  
        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-indigo-600 transition-colors duration-300">
          {article.title}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {article.content.length > 150 ? `${article.content.slice(0, 150)}...` : article.content}
        </p>
         
     
        <div className="flex items-center justify-between mt-6 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Author"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{article.author}</p>
              <p className="text-xs text-gray-500">{article.created_at}</p>
            </div>
          </div>

          <Link href={`/pages/article/${id}`}>
            <span className="inline-flex items-center text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
              <span className="mr-2 text-sm font-medium">Leer más</span>
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;