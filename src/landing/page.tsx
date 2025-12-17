import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, ArrowLeft, Loader2, Heart } from 'lucide-react';
import { generateProducts } from '@/data/helper';
import { ProductCard, ProductDetail } from '@/products/productCard';

interface LandingPageProps {
  children: React.ReactNode;
}

const LandingPage: React.FC<LandingPageProps> = ({ children }) => {
    const [products] = useState(generateProducts());
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (selectedProduct) {
        return <ProductDetail productId={selectedProduct} onBack={() => setSelectedProduct(null)} />;
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Nirmiti3D</h1>
                    </div>
                    <div className="text-sm text-gray-600">
                    {filteredProducts.length} Products
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <div className="flex gap-2 overflow-x-auto">
                    {categories.map(cat => (
                        <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                            filter === cat
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        >
                        {cat}
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            </header>

            {/* Products Grid */}
            <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={setSelectedProduct}
                    isLoading={undefined}
                />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                <p className="text-gray-500 text-xl">No products found</p>
                </div>
            )}
            </main>
        </div>
    )
}

export default LandingPage;