import React, { useState } from 'react';

const categories = [
  { id: 'frontend', title: 'Frontend', desc: 'HTML, CSS, JS, and DOM manipulation' },
  { id: 'react', title: 'React', desc: 'Hooks, State, and Component architecture' },
  { id: 'backend', title: 'Backend', desc: 'Node.js, Databases, and RESTful APIs' },
  { id: 'hr', title: 'Behavioral / HR', desc: 'Soft skills, leadership, and past experience' }
];

const CategorySelector = ({ onStart }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm p-6 md:p-10 border border-gray-200 dark:border-slate-700 w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Select Interview Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 ${selected === cat.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600'}`}
          >
            <h3 className={`text-xl font-semibold mb-2 ${selected === cat.id ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
              {cat.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{cat.desc}</p>
          </button>
        ))}
      </div>
      <button
        disabled={!selected}
        onClick={() => onStart(selected)}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold rounded-2xl transition-colors shadow-md hover:shadow-lg"
      >
        Continue to Setup
      </button>
    </div>
  );
};

export default CategorySelector;