import { createFinancialData, getFinancialDataByUserId, updateFinancialData, deleteFinancialData, FinancialData } from './financialData';
import { createCreditScore, getCreditScoresByUserId, updateCreditScore, CreditScore, calculateCreditScore } from './creditScores';

async function runTests() {
  try {
    console.log('Starting backend tests...');

    // Test data
    const testUserId = '00000000-0000-0000-0000-000000000000'; // Replace with a valid test user ID

    // Financial Data Tests
    const financialData: FinancialData = {
      user_id: testUserId,
      income: 5000,
      debt: 1000,
      assets: 20000,
      payment_history: { payments: ['on-time', 'late'] },
    };

    // Create financial data
    const createdFinancialData = await createFinancialData(financialData);
    console.log('Created financial data:', createdFinancialData);

    // Get financial data
    const fetchedFinancialData = await getFinancialDataByUserId(testUserId);
    console.log('Fetched financial data:', fetchedFinancialData);

    // Update financial data
    const updatedFinancialData = await updateFinancialData((createdFinancialData as any).id!, { income: 6000 });
    console.log('Updated financial data:', updatedFinancialData);

    // Credit Score Tests
    const scoreValue = calculateCreditScore(updatedFinancialData);
    console.log('Calculated credit score:', scoreValue);

    const creditScore: CreditScore = {
      user_id: testUserId,
      score: scoreValue,
      report_data: { details: 'Test credit score report' },
    };

    // Create credit score
    const createdCreditScore = await createCreditScore(creditScore);
    console.log('Created credit score:', createdCreditScore);

    // Get credit scores
    const fetchedCreditScores = await getCreditScoresByUserId(testUserId);
    console.log('Fetched credit scores:', fetchedCreditScores);

    // Update credit score
    const updatedCreditScore = await updateCreditScore((createdCreditScore as any).id!, { score: scoreValue + 10 });
    console.log('Updated credit score:', updatedCreditScore);

    // Delete financial data
    const deletedFinancialData = await deleteFinancialData((createdFinancialData as any).id!);
    console.log('Deleted financial data:', deletedFinancialData);

    console.log('Backend tests completed successfully.');
  } catch (error) {
    console.error('Backend tests failed:', error);
  }
}

runTests();
