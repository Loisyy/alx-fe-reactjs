import { useState } from 'react';
import React from 'react';

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: ''
  });

  // Validates error state
  const [errors, setErrors] = useState({});

  // Submission status
  const [submitted, setSubmitted] = useState(false);

  // Handles input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
//Validate form

const validate = () => {
    const newErrors = {};

    //Validates title
    if (!formData.title.trim()) {
        newErrors.title = 'Title must be at least 3 character long';
    }

    //Validate ingredients
    if(!formData.ingredients.trim()) {
        newErrors.ingredients = 'Ingredients are required'
    } else {
        //Check if ingredients list has at least 2 items
        const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim() !== '');

        if (ingredientsList.length < 2) {
            newErrors.ingredients = 'Please add at least 2 ingredients (one per line)';
        }
    }

    //Validate preparation steps 
    if (!formData.steps.trim()) {
        newErrors.steps = 'Preaparation steps required'
    } else {
        const stepsList = formData.steps.split('\n').filter(item => item.trim() !== '');

        if (stepsList.length < 1 ) {
            newErrors.steps = 'Please add at least 1 preparation step';
        }
    }
    
    return newErrors;
};

//Handle form submission
const handleSubmit = (e) => {
    e.preventDefault();

    //Validate form
    const newErrors = validate();

    if ( Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    // Process form data (in a real app, you'd send to backend)
    console.log('Form submitted:', {
        title: formData.title,
        ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
        steps: formData.steps.split('\n').filter(s => s.trim())
    });

    //Show success message
    setSubmitted(true);

    // Reset form
    setFormData({
        title: '',
        ingredients: '',
        steps: ''
    });
    setErrors({});

    // Hide success message after 3 seconds
    setTimeout(() => {
        setSubmitted(false);
    }, 3000);
};

return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12'>
        <div className='container mx-auto px-4'>
             {/* Header */}
             <div className='text-center mb-8'>
                <h1 className='text-4xl font-bold text-gray-800 mb-2'>🍽️ Add New Recipe</h1>
                <p className='text-gray-600'>Share your favourite recipe with the community</p>
             </div>

             {/* Success Message */}
        {submitted && (
          <div className="mx-w-2xl mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md animate-bounce">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Recipe submitted successfully! 🎉</span>
            </div>
          </div>
        )}
        
        {/* Form Container */}
        <div className='mx-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12'>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Recipe Title */}
                <div>
                    <label htmlFor="title" className='block text-lg font-semibold text-gray-700 mb-2'
                    >
                        Recipe Title
                        <span className='text-red-500 ml-1'></span>
                    </label>
                    <input type="text"
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='e.g., Chocolate chips cookies'
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.title 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                
                    }`} />
                    {errors.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.title}
                </p>
              )}
                </div>

                {/* Ingredients */}
                <div>
                  <label htmlFor="ingredients" className='block text-lg font-semibold text-gray-700 mb-2'>
                    Ingredients
                    <span className='text-red-500 ml-1'>*</span>
                  </label>
                  <textarea
                    id='ingredients'
                    name='ingredients'
                    value={formData.ingredients}
                    onChange={handleChange}
                    placeholder='Enter ingredients (one per line)&#10;e.g.:&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs'
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                      errors.ingredients
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                  />
                  {errors.ingredients && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.ingredients}
                    </p>
                  )}
                </div>

                {/* Preparation Steps */}
                <div>
                  <label htmlFor="steps" className='block text-lg font-semibold text-gray-700 mb-2'>
                    Preparation Steps
                    <span className='text-red-500 ml-1'>*</span>
                  </label>
                  <textarea
                    id='steps'
                    name='steps'
                    value={formData.steps}
                    onChange={handleChange}
                    placeholder='Enter preparation steps (one per line)&#10;e.g.:&#10;1. Preheat oven to 350°F&#10;2. Mix flour and sugar&#10;3. Add eggs one at a time'
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                      errors.steps
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                  />
                  {errors.steps && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.steps}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className='flex gap-4 pt-6'>
                  <button
                    type='submit'
                    className='flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
                  >
                    Submit Recipe
                  </button>
                  <button
                    type='reset'
                    onClick={() => {
                      setFormData({ title: '', ingredients: '', steps: '' });
                      setErrors({});
                    }}
                    className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-200'
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }

export default AddRecipeForm;

