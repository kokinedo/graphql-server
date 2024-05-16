import AppDataSource from './data-source';

async function testConnection() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();