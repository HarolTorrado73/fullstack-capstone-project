import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';
import './SearchPage.css';

function SearchPage() {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [ageRange, setAgeRange] = useState(10);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const url = `${urlConfig.backendUrl}/api/gifts`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                setSearchResults(data);

            } catch (error) {
                console.log('Fetch error:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);

            const data = await response.json();

            const filtered = data.filter((gift) => {
                return (
                    (searchQuery === '' ||
                        gift.name.toLowerCase().includes(searchQuery.toLowerCase())) &&

                    (selectedCategory === '' ||
                        gift.category === selectedCategory) &&

                    (selectedCondition === '' ||
                        gift.condition === selectedCondition) &&

                    (gift.age <= ageRange)
                );
            });

            setSearchResults(filtered);

        } catch (error) {
            console.log('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">
                <div className="col-md-6">

                    {/* FILTERS */}
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>

                        <div className="d-flex flex-column">

                            <select
                                className="form-select mb-3"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </select>

                            <select
                                className="form-select mb-3"
                                value={selectedCondition}
                                onChange={(e) => setSelectedCondition(e.target.value)}
                            >
                                <option value="">All Conditions</option>
                                {conditions.map((c, i) => (
                                    <option key={i} value={c}>{c}</option>
                                ))}
                            </select>

                            <label className="form-label">
                                Age Range: {ageRange}
                            </label>

                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={ageRange}
                                className="form-range"
                                onChange={(e) => setAgeRange(Number(e.target.value))}
                            />

                        </div>
                    </div>

                    {/* SEARCH INPUT */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search gifts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button
                        className="btn btn-primary mb-3 w-100"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    {/* RESULTS */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="row">

                            {searchResults.length > 0 ? (
                                searchResults.map((gift) => (
                                    <div key={gift.id} className="col-md-4 mb-4">

                                        <div
                                            className="card"
                                            onClick={() => goToDetailsPage(gift.id)}
                                            style={{ cursor: 'pointer' }}
                                        >

                                            <img
                                                src={gift.image || 'https://via.placeholder.com/300'}
                                                className="card-img-top"
                                                alt={gift.name}
                                            />

                                            <div className="card-body">
                                                <h5 className="card-title">{gift.name}</h5>
                                                <p className="card-text">{gift.category}</p>
                                                <p className="card-text">{gift.condition}</p>
                                            </div>

                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="alert alert-warning">
                                    No products found
                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default SearchPage;