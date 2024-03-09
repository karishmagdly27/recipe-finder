import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
    const { image, label, cuisineType, dietLabel, mealType, uri } = recipe?.recipe

    const id = uri?.split("#")[1]

    return (
        <Link to={`/recipes/${id}`} className='w-full md:w-[200px]'>
            <div className='bg-_gradient shadow w-full rounded-lg'>
                <img src={image} alt={label} className='rounded-lg h-[200px] md:h-[150px] w-full' />

                <div className='p-3'>
                    <p className='text-white font-semibold'>{label}</p>

                    <div className='mt-2'>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full mr-3 text-green-500'>
                            {cuisineType && cuisineType[0] && cuisineType[0].charAt(0).toUpperCase() + cuisineType[0].slice(1)}
                        </span>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500'>
                            {mealType && mealType[0] && mealType[0].charAt(0).toUpperCase() + mealType[0].slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RecipeCard