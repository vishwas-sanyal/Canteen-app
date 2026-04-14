import type { FC } from 'react';
import type { Student } from '@types/index';

interface StudentCardProps {
    student: Student;
    onMoreInfo: (student: Student) => void;
}

export const StudentCard: FC<StudentCardProps> = ({ student, onMoreInfo }) => {
    return (
        <div
            className="
        rounded-2xl  md:p-4
        bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900 
        border border-dark-700 hover:border-secondary-500/50
        transition-all duration-300 transform 
        shadow-xl hover:shadow-2xl
        group flex items-start gap-3 md:gap-4 overflow-hidden relative
      "
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-600/0 to-secondary-600/0 group-hover:from-secondary-600/5 group-hover:to-secondary-600/10 transition-all duration-300 pointer-events-none" />

            {/* Student Avatar */}
            <div
                className="
        w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br 
        from-secondary-500 to-secondary-700
        flex items-center justify-center
        text-white font-bold text-lg md:text-2xl
        group-hover:from-secondary-400 group-hover:to-secondary-600
        transition-all duration-300 flex-shrink-0 text-center
        shadow-lg
      "
            >
                {student.name.charAt(0).toUpperCase()}
            </div>

            {/* Student Info */}
            <div className="flex-1 min-w-0 relative z-10">
                <h3 className="text-white font-bold text-sm md:text-base mb-1 truncate">
                    {student.name}
                </h3>

                <div className="flex flex-wrap gap-2 mb-2">
                    <div className="inline-block px-2 py-1 rounded-lg bg-dark-700/70 ">
                        <p className="text-dark-400 text-xs font-medium">
                            {student.rollNo}
                        </p>
                    </div>
                    <div className="inline-block px-2 py-1 rounded-lg bg-primary-600/20 border border-primary-500/30">
                        <p className="text-primary-300 text-xs font-medium">
                            {student.class}
                        </p>
                    </div>
                </div>

                <div className="mb-2">
                    <p className="text-dark-500 text-xs mb-1">Code</p>
                    <p className="text-secondary-400 font-mono text-xs md:text-sm font-semibold">
                        {student.referralCode}
                    </p>
                </div>

                <div className="flex justify-between items-center mb-3">
                    <div>
                        <p className="text-dark-500 text-xs mb-0.5">Total Spent</p>
                        <p className="text-primary-400 font-bold text-sm md:text-base">
                            ₹{student.totalSpent.toFixed(2)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-dark-500">Rank</p>
                        <p className="text-lg font-bold text-secondary-400">
                            #{Math.floor(Math.random() * 100) + 1}
                        </p>
                    </div>
                </div>

                {/* More Info Button */}
                <button
                    onClick={() => onMoreInfo(student)}
                    className="
            w-full py-2 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm
            border-2 border-secondary-500/60 text-secondary-300
            hover:bg-secondary-500/20 hover:border-secondary-400 hover:text-secondary-200
            transition-all duration-300 transform hover:scale-105
            active:scale-95 relative z-10
          "
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};
