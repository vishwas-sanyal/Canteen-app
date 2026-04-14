import { useEffect, useState } from 'react';
import {
  StudentCard,
  SearchBar,
  AddStudentDrawer,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
} from '@components/index';
import { useStudentsStore, useUIStore } from '@store/index';
import { getStudents, createStudent } from '@api/index';
import { filterStudents } from '@utils/index';
import type { Student, AddStudentFormData } from '@types/index';

interface StudentsPageProps {
  onSelectStudent: (student: Student) => void;
}

export const StudentsPage: React.FC<StudentsPageProps> = ({ onSelectStudent }) => {
  const { students, setStudents, addStudent } = useStudentsStore();
  const { isAddStudentOpen, setIsAddStudentOpen, searchQuery, setSearchQuery } =
    useUIStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to load students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddStudent = async (data: AddStudentFormData & { id: string; referralCode: string }) => {
    try {
      setLoading(true);
      const newStudent = await createStudent(data);
      addStudent(newStudent);
      setIsAddStudentOpen(false);
    } catch (err) {
      setError('Failed to add student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = filterStudents(students, searchQuery);

  return (
    <div className="min-h-screen pb-6">
      {/* Section Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-white font-bold text-2xl md:text-4xl mb-1">👥 Students</h1>
        <p className="text-dark-400 text-sm md:text-base">Manage students and view their purchase history</p>
      </div>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search students..."
        onSearch={handleSearch}
        onAddClick={() => setIsAddStudentOpen(true)}
      />

      {/* Error State */}
      {error && <ErrorMessage message={error} onRetry={fetchStudents} />}

      {/* Loading State */}
      {loading && !isAddStudentOpen && <LoadingSpinner />}

      {/* Students List */}
      {!loading && !error && (
        <>
          {filteredStudents.length === 0 ? (
            <EmptyState
              message={searchQuery ? 'No students found' : 'No students yet. Add one!'}
              icon={searchQuery ? '🔍' : '👥'}
            />
          ) : (
            <div className="space-y-2 md:space-y-3">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onMoreInfo={onSelectStudent}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Add Student Drawer */}
      <AddStudentDrawer
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onSubmit={handleAddStudent}
        isLoading={loading}
      />
    </div>
  );
};
