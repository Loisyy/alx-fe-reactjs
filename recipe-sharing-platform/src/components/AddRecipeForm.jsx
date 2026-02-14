import { useState } from 'react';
import React from 'react';

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handles input change (UPDATED TO INCLUDE e.target.value)
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title must be at least 3 character long';
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientsList = formData.ingredients
        .split('\n')
        .filter(item => item.trim() !== '');

      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients (one per line)';
      }
    }

    if (!formData.steps.trim()) {
      newErrors.steps = 'Preaparation steps required';
    } else {
      const stepsList = formData.steps
        .split('\n')
        .filter(item => item.trim() !== '');

      if (stepsList.length < 1) {
        newErrors.steps = 'Please add at least 1 preparation step';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Form submitted:', {
      title: formData.title,
      ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
      steps: formData.steps.split('\n').filter(s => s.trim())
    });

    setSubmitted(true);

    setFormData({
      title: '',
      ingredients: '',
      steps: ''
    });

    setErrors({});

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>🍽️ Add New Recipe</h1>
          <p className='text-gray-600'>Share your favourite recipe with the community</p>
        </div>

        {submitted && (
          <div className="max-w-2xl mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md animate-bounce">
            <span className="font-semibold">Recipe submitted successfully! 🎉</span>
          </div>
        )}

        <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12'>
          <form onSubmit={handleSubmit} className='space-y-6'>

            <div>
              <label htmlFor="title" className='block text-lg font-semibold text-gray-700 mb-2'>
                Recipe Title
              </label>
              <input
                type="text"
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='w-full px-4 py-3 border rounded-lg'
              />
              {errors.title && <p className="text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="ingredients" className='block text-lg font-semibold text-gray-700 mb-2'>
                Ingredients
              </label>
              <textarea
                id='ingredients'
                name='ingredients'
                value={formData.ingredients}
                onChange={handleChange}
                rows={5}
                className='w-full px-4 py-3 border rounded-lg'
              />
              {errors.ingredients && <p className="text-red-600">{errors.ingredients}</p>}
            </div>

            <div>
              <label htmlFor="steps" className='block text-lg font-semibold text-gray-700 mb-2'>
                Preparation Steps
              </label>
              <textarea
                id='steps'
                name='steps'
                value={formData.steps}
                onChange={handleChange}
                rows={6}
                className='w-full px-4 py-3 border rounded-lg'
              />
              {errors.steps && <p className="text-red-600">{errors.steps}</p>}
            </div>

            <button
              type='submit'
              className='w-full bg-orange-500 text-white py-3 rounded-lg'
            >
              Submit Recipe
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;
