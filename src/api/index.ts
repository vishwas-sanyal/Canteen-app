import { Snack, Student, Order, PlaceOrderFormData, AddStudentFormData } from '@types/index';
import { MOCK_SNACKS, MOCK_STUDENTS, MOCK_ORDERS } from '@data/mockData';

// In-memory data stores (simulates database)
let snacks = JSON.parse(JSON.stringify(MOCK_SNACKS));
let students = JSON.parse(JSON.stringify(MOCK_STUDENTS));
let orders = JSON.parse(JSON.stringify(MOCK_ORDERS));

// Simulate API delay for realistic behavior
const delay = (): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, 300));
};

// Snacks API
export const getSnacks = async (): Promise<Snack[]> => {
  await delay();
  try {
    return JSON.parse(JSON.stringify(snacks));
  } catch (error) {
    console.error('Error fetching snacks:', error);
    throw error;
  }
};

export const getSnackById = async (id: string): Promise<Snack> => {
  await delay();
  try {
    const snack = snacks.find((s: Snack) => s.id === id);
    if (!snack) throw new Error('Snack not found');
    return JSON.parse(JSON.stringify(snack));
  } catch (error) {
    console.error('Error fetching snack:', error);
    throw error;
  }
};

// Students API
export const getStudents = async (): Promise<Student[]> => {
  await delay();
  try {
    return JSON.parse(JSON.stringify(students));
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getStudentById = async (id: string): Promise<Student> => {
  await delay();
  try {
    const student = students.find((s: Student) => s.id === id);
    if (!student) throw new Error('Student not found');
    return JSON.parse(JSON.stringify(student));
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
};

export const createStudent = async (data: AddStudentFormData): Promise<Student> => {
  await delay();
  try {
    const referralCode = generateReferralCode();
    const studentId = generateStudentId();
    const newStudent: Student = {
      id: studentId,
      ...data,
      referralCode,
      totalSpent: 0,
    };
    students.push(newStudent);
    return JSON.parse(JSON.stringify(newStudent));
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id: string, data: Partial<Student>): Promise<Student> => {
  await delay();
  try {
    const index = students.findIndex((s: Student) => s.id === id);
    if (index === -1) throw new Error('Student not found');
    
    students[index] = { ...students[index], ...data };
    return JSON.parse(JSON.stringify(students[index]));
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Orders API
export const getOrders = async (): Promise<Order[]> => {
  await delay();
  try {
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getStudentOrders = async (studentId: string): Promise<Order[]> => {
  await delay();
  try {
    return JSON.parse(JSON.stringify(
      orders.filter((o: Order) => o.studentId === studentId)
    ));
  } catch (error) {
    console.error('Error fetching student orders:', error);
    throw error;
  }
};

export const createOrder = async (data: PlaceOrderFormData): Promise<Order> => {
  await delay();
  try {
    let totalAmount = 0;
    const createdOrders: Order[] = [];

    // Create individual orders for each item
    for (const item of data.items) {
      const snack = snacks.find((s: Snack) => s.id === item.snackId);
      if (!snack) throw new Error('Snack not found');

      const orderAmount = snack.price * item.quantity;
      totalAmount += orderAmount;

      const newOrder: Order = {
        id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        studentId: data.studentId,
        snackId: item.snackId,
        quantity: item.quantity,
        amount: orderAmount,
        createdAt: new Date().toISOString(),
      };

      orders.push(newOrder);
      createdOrders.push(newOrder);
    }

    // Update student total spent
    const studentIndex = students.findIndex((s: Student) => s.id === data.studentId);
    if (studentIndex !== -1) {
      students[studentIndex].totalSpent += totalAmount;
    }

    return createdOrders[0] || ({} as Order);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Utility Functions
export const generateReferralCode = (length: number = 6): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateStudentId = (): string => {
  return `STU_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
