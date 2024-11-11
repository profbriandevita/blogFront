'use client';

import Layout from "./components/Layout";
import Card from "./components/Card";

import { AuthProvider } from "@/context/AuthProvider";
import { ArticleProvider, useArticles } from "@/context/ArticleProvider";
import { CreateArticleModal } from "./components/CreateArticleModal";
import { useState } from "react";






export default function Home() {
  return (
      <AuthProvider>
    <ArticleProvider>
        <HomeContent/>
    </ArticleProvider>
      </AuthProvider>
  )
}


function HomeContent() {
  const {filteredArticles, loading, createArticle, deleteArticle} = useArticles()
   const [isModalOpen, setIsModalOpen] = useState(false)


   const handleOpenModal = () => setIsModalOpen(true)
   const handleCloseModal = () => setIsModalOpen(false)


  if (loading) return <p>Cargando Articulos....</p>

  return (
      <Layout onOpenCreateModal={handleOpenModal}  >
       
        <div className="container mx-auto py-10">
          
          <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Ultimos Articulos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            { 
              filteredArticles.map((article)=> (
              <Card
              deleteArticle={deleteArticle}
              key={article.id}
              id={article.id}
              />
              ))
            }
          </div>

          {isModalOpen && <CreateArticleModal onClose={handleCloseModal} onSubmit={createArticle}/> }

        </div>
      </Layout>

  );
}
