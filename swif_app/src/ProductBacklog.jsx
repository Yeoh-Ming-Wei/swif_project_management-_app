import { useState, useEffect } from 'react';
import CreateTask from './CreateTask';

const ProductBacklog = () => {
    const defaultName = 'Product Backlog';
    const storedName = localStorage.getItem('productName');
    
    const [productName, setProductName] = useState(storedName || defaultName);
    const [editingName, setEditingName] = useState(false);

    useEffect(() => {
        // Save the product name to localStorage whenever it changes
        localStorage.setItem('productName', productName);
    }, [productName]);

    return (
        <>
            <h1>{productName}</h1>
            {editingName ? 
                <div>
                    <input 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        style={{ fontSize: '1.5em', padding: '10px', width: '300px' }}  // Adjust these styles as desired
                    />
                    <button onClick={() => setEditingName(false)}>Confirm</button>
                </div>
            :
                <button onClick={() => setEditingName(true)}>Change Name</button>
            }
            <CreateTask />
        </>
    );
};

export default ProductBacklog;