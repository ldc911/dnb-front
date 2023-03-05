import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main
      className="h-screen bg-cover bg-top sm:bg-top"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-sm font-semibold text-white text-opacity-75 uppercase tracking-wide">
          404 error
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          Page introuvable
        </h1>
        <p className="mt-2 text-lg font-medium text-white text-opacity-80">
          Il semblerait que la page à laquelle tu essayes d'accéder n'existe pas
          ...
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white text-opacity-75 bg-red-700 sm:hover:bg-red-900"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
