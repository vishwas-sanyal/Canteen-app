import React, { useEffect, useState } from 'react';
import { SnacksPage, StudentsPage, StudentDetailPage } from '@pages/index';
import { TabToggle } from '@components/index';
import { useUIStore, useStudentsStore, useSnacksStore } from '@store/index';
import { getStudents, getSnacks } from '@api/index';
import { Student } from '@types/index';

type PageView = 'snacks' | 'students' | 'student-detail';

function App() {
    const currentTab = useUIStore((state) => state.currentTab);
    const setCurrentTab = useUIStore((state) => state.setCurrentTab);
    const students = useStudentsStore((state) => state.students);
    const setStudents = useStudentsStore((state) => state.setStudents);
    const snacks = useSnacksStore((state) => state.snacks);
    const setSnacks = useSnacksStore((state) => state.setSnacks);

    const [pageView, setPageView] = useState<PageView>('snacks');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [loadingData, setLoadingData] = useState(false);

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true);
                const [studentsData, snacksData] = await Promise.all([
                    getStudents(),
                    getSnacks()
                ]);
                setStudents(studentsData);
                setSnacks(snacksData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [setStudents, setSnacks]);

    // Handle page navigation
    const handleTabChange = (tab: 'snacks' | 'students') => {
        setCurrentTab(tab);
        setPageView(tab);
        setSelectedStudent(null);
    };

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        setPageView('student-detail');
    };

    const handleBackFromDetail = () => {
        setPageView('students');
        setSelectedStudent(null);
    };

    const handlePlaceOrderFromDetail = (student: Student) => {
        setPageView('snacks');
        setCurrentTab('snacks');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800">
            {/* Main Container */}
            <div className="w-full  mx-auto px-3 md:px-4 pt-4 md:pt-8 pb-24">
                {/* App Header - Professional Design */}
                <div className="mb-8 md:mb-12">
                    <div className="text-center">
                        <div className="inline-block mb-4">
                            <div className="text-5xl md:text-6xl animate-bounce">🍴</div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent mb-2">
                            Canteen Store
                        </h1>
                        <p className="text-dark-400 text-sm md:text-base font-medium mb-1">Order Your Favorite Snacks</p>
                        <div className="h-1 w-12 mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mt-3" />
                    </div>
                </div>

                {/* Page Content */}
                <div className="mb-6 md:mb-8">
                    {pageView === 'snacks' && (
                        <SnacksPage students={students} />
                    )}
                    {pageView === 'students' && (
                        <StudentsPage onSelectStudent={handleSelectStudent} />
                    )}
                    {pageView === 'student-detail' && selectedStudent && (
                        <StudentDetailPage
                            student={selectedStudent}
                            snacks={snacks}
                            onBack={handleBackFromDetail}
                            onPlaceOrder={handlePlaceOrderFromDetail}
                        />
                    )}
                </div>

                {/* Tab Toggle - Sticky and Professional */}
                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 via-dark-900/95 to-dark-900/90 border-t border-dark-700/50 shadow-2xl z-30 flex justify-center py-3">
                    <div className="w-auto">
                        <TabToggle activeTab={currentTab} onTabChange={handleTabChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
