'use client'
import Layout from '@/app/components/Layout';
import { useArticles } from '@/context/ArticleProvider';
import { Article } from '@/types/article';
import { useEffect, useState } from 'react';




const ArticlePage = ({ params }: { params:  Promise<{ id: string }>}) => {
  const [article, setArticle] = useState<Article | null>(null);
  const { fetchArticleById} = useArticles()


  useEffect(() => {
    const loadArticle = async () => {
      try {
        const resolvedParams = await params;
        const articleData = await fetchArticleById(parseInt(resolvedParams.id))
        setArticle(articleData)
      } catch (error) {
        console.error('Error al obtener el articulo', error)
      }
    }
    loadArticle()
  }, [params, fetchArticleById])
  



  if (!article) {
    return (
      <Layout>
        <p className='text-center text-gray-500 mt-8'>Cargando artículo...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8'>
        {
          article.image_url && (
            <div className='mb-6'>
                <img src={article.image_url} alt={article.title}  className='w-full h-64 object-cover rounded-lg shadow-md'/>
            </div>
          )
        }

        <h1 className='text-4xl font-bold text-indigo-600 mb-4'>{article.title}</h1>
        <div className='flex items-center text-gray-500 mb-6'>
          <p className='text-sm'>Publicado: {article.created_at}  </p>
          <span className='mx-2'> | </span>
          <p className='text-sm'>Autor: {article.author}</p>
        </div>

        <p className='text-lg text-gray-700 leading-relaxed'>{article.content}</p>
      </div>
    </Layout>
  );
};

export default ArticlePage;
