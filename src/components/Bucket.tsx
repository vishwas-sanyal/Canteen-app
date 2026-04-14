import React from 'react';

interface BucketProps {
    itemCount: number;
    onClick: () => void;
    isDragOver?: boolean;
}

export const Bucket: React.FC<BucketProps> = ({ itemCount, onClick, isDragOver = false }) => {
    return (
        <div
            onClick={onClick}
            className={`
        fixed bottom-28 md:bottom-24 right-3 md:right-6
        w-16 h-16 md:w-20 md:h-20 rounded-2xl
        flex items-center justify-center cursor-pointer
        transition-all duration-300 transform
        ${isDragOver
                    ? 'bg-primary-500 scale-110 shadow-xl ring-4 ring-primary-300'
                    : 'bg-gradient-to-br from-primary-600 to-primary-800 hover:scale-105 shadow-lg-food'
                }
      `}
        >
            <div className="text-center">
                <div className="text-xl md:text-2xl">🧺</div>
                {itemCount > 0 && (
                    <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-xs">
                        {itemCount}
                    </div>
                )}
            </div>
        </div>
    );
};
