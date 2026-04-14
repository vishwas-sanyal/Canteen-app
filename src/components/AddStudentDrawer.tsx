import { useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import type { AddStudentFormData } from '@types/index';
import { generateReferralCode, generateStudentId } from '@api/index';

interface AddStudentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddStudentFormData & { id: string; referralCode: string }) => void;
  isLoading?: boolean;
}

export const AddStudentDrawer: FC<AddStudentDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddStudentFormData>();
  const [generatedCode, setGeneratedCode] = useState('');

  const handleFormSubmit = (data: AddStudentFormData) => {
    const code = generateReferralCode();
    const id = generateStudentId();
    setGeneratedCode(code);
    onSubmit({
      ...data,
      id,
      referralCode: code,
    });
    reset();
    setGeneratedCode('');
  };

  const handleClose = () => {
    reset();
    setGeneratedCode('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="
              fixed bottom-0 left-0 right-0 z-50
              bg-gradient-to-br from-secondary-800 via-secondary-850 to-secondary-900
              border-t-2 border-secondary-600/50 shadow-2xl
              rounded-t-3xl p-4 md:p-6 max-h-[90vh] md:max-h-[85vh] overflow-y-auto
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-white font-bold text-2xl md:text-3xl">👤 Add Student</h2>
              <button
                onClick={handleClose}
                className="
                  w-8 h-8 md:w-10 md:h-10 rounded-full
                  bg-dark-700 text-white font-bold text-lg md:text-xl
                  hover:bg-primary-500 transition-all duration-200
                "
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2.5 md:space-y-4">
              {/* Name Input */}
              <div>
                <label className="text-secondary-300 text-xs md:text-sm font-semibold mb-1.5 md:mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter student name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  className="
                    w-full px-2.5 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-base
                    bg-dark-700 text-white placeholder-dark-400
                    border-2 border-secondary-600 focus:border-secondary-500
                    focus:outline-none transition-all duration-200
                  "
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Roll Number Input */}
              <div>
                <label className="text-secondary-300 text-xs md:text-sm font-semibold mb-1.5 md:mb-2 block">
                  Roll no
                </label>
                <input
                  type="text"
                  placeholder="Enter roll number"
                  {...register('rollNo', {
                    required: 'Roll number is required',
                  })}
                  className="
                    w-full px-2.5 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-base
                    bg-dark-700 text-white placeholder-dark-400
                    border-2 border-secondary-600 focus:border-secondary-500
                    focus:outline-none transition-all duration-200
                  "
                />
                {errors.rollNo && (
                  <p className="text-red-400 text-xs mt-1">{errors.rollNo.message}</p>
                )}
              </div>

              {/* Class Input */}
              <div>
                <label className="text-secondary-300 text-xs md:text-sm font-semibold mb-1.5 md:mb-2 block">
                  Class
                </label>
                <input
                  type="text"
                  placeholder="Enter class"
                  {...register('class', {
                    required: 'Class is required',
                  })}
                  className="
                    w-full px-2.5 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-base
                    bg-dark-700 text-white placeholder-dark-400
                    border-2 border-secondary-600 focus:border-secondary-500
                    focus:outline-none transition-all duration-200
                  "
                />
                {errors.class && (
                  <p className="text-red-400 text-xs mt-1">{errors.class.message}</p>
                )}
              </div>

              {/* Auto-generated Code Display */}
              <div className="bg-dark-800 rounded-lg md:rounded-xl p-2.5 md:p-4 border border-primary-600">
                <label className="text-secondary-300 text-xs md:text-sm font-semibold mb-1.5 md:mb-2 block">
                  Code (Auto-generated)
                </label>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <input
                    type="text"
                    value={generatedCode || generateReferralCode()}
                    readOnly
                    onClick={(e) => {
                      setGeneratedCode(generateReferralCode());
                    }}
                    className="
                      flex-1 px-2.5 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-lg text-xs md:text-base
                      bg-dark-700 text-primary-400 font-bold
                      border-2 border-primary-600
                      cursor-pointer
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setGeneratedCode(generateReferralCode())}
                    className="
                      px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-sm md:text-base
                      bg-primary-600 text-white font-bold
                      hover:bg-primary-500 transition-all duration-200 flex-shrink-0
                    "
                  >
                    🔄
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base text-white
                  bg-gradient-to-r from-primary-500 to-primary-600
                  hover:from-primary-400 hover:to-primary-500
                  disabled:from-dark-600 disabled:to-dark-600 disabled:cursor-not-allowed
                  transition-all duration-300 transform hover:scale-105
                  active:scale-95 shadow-lg flex items-center justify-center gap-2
                "
              >
                <span>+</span>
                <span>{isLoading ? 'Adding Student...' : 'Add Student'}</span>
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
