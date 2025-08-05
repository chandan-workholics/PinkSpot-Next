'use client';

import React, { Suspense } from 'react';
import AllCategoryClient from './AllCategoryClient';

const AllCategory = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AllCategoryClient />
        </Suspense>
    );
};

export default AllCategory;