import { useState, useEffect } from 'react';
import RecipeData from "../data.json";

function HomePage() {
    const [recipes, setRecipes] = useState([]);


useEffect(() => {
    //Load recipe date when component mount
    setRecipes(RecipeData);
}, []);

return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/*Header section*/}
        <header className='bg-white shadow-md'>
            <div className='container max-auto px-4 py-6'>
                <h1 className='text-4-xl font-bold text-gray-800 text-center'>Recipe Sharing Plateform</h1>
                <p className='text-center text-gray-600 mt-2'> Discover and share amazing recipe from all around the world</p>
            </div>
        </header>
        {/*Main Content*/}
        <main className='container max-auto px-4 py-8'>
            {/*React Grid*/}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {recipes.map((recipe) => (
                    <div
                    key={recipe.id}
                    className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300'
                    >
                        {/*Recipe image*/}
                        <img src={recipe.image} alt={recipe.title} className='w-full h-48 object-cover' />

                        {/*Recipe content*/}
                        <div className='p-6'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                                {recipe.title}
                            </h2>
                            <p className='text-gray-600 mb-4'>
                                {recipe.summary}
                            </p>

                            {/* View detail button*/}
                            <button className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-color duration-200'>
                                View Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/*Empty state*/}
            {recipes.length === 0 && (
                <div className='text-center py-12'>
                    <p className='text-gray-800 text-lg'>no recipe found. Add some recipe and enjoy</p>
                </div>
            )}
        </main>

        <footer bg-white mt-12 py-6 border-t>
            <div className='container max-auto px-4 text-center text-gray-600'>
                <p>© 2026 Recipe Sharing Platform</p>
            </div>
        </footer>
    </div>
);
}

export default HomePage;