export class CreditSimulator {
  simulate(options) {
    const {
      currentScore,
      monthlyPayment = 0,
      totalDebt = 0,
      newAccount = false,
      creditUtilization = 0
    } = options;

    let newScore = currentScore;
    const factors = {};
    const recommendations = [];

    // Payment history impact (35% of score)
    if (monthlyPayment >= 500) {
      newScore += 15;
      factors.paymentHistory = 'Excellent';
    } else if (monthlyPayment >= 300) {
      newScore += 8;
      factors.paymentHistory = 'Good';
    } else if (monthlyPayment >= 100) {
      newScore += 3;
      factors.paymentHistory = 'Fair';
    } else {
      newScore -= 10;
      factors.paymentHistory = 'Poor';
      recommendations.push('Increase monthly payments to improve payment history');
    }

    // Credit utilization impact (30% of score)
    const utilizationRatio = totalDebt / 20000; // Assuming $20k credit limit
    if (utilizationRatio < 0.1) {
      newScore += 20;
      factors.creditUtilization = 'Excellent';
    } else if (utilizationRatio < 0.3) {
      newScore += 10;
      factors.creditUtilization = 'Good';
    } else if (utilizationRatio < 0.5) {
      newScore -= 5;
      factors.creditUtilization = 'Fair';
      recommendations.push('Reduce debt to lower credit utilization');
    } else {
      newScore -= 20;
      factors.creditUtilization = 'Poor';
      recommendations.push('Significantly reduce debt to improve score');
    }

    // New account impact (10% of score)
    if (newAccount) {
      newScore -= 5;
      recommendations.push('New accounts temporarily lower your score');
    }

    // Ensure score stays within valid range
    newScore = Math.max(300, Math.min(850, Math.round(newScore)));

    return {
      newScore,
      change: newScore - currentScore,
      factors,
      recommendations
    };
  }

  calculateProjectedScore(currentScore, actions) {
    let projectedScore = currentScore;

    actions.forEach(action => {
      switch (action.type) {
        case 'pay_debt':
          projectedScore += Math.min(25, action.amount / 1000 * 5);
          break;
        case 'on_time_payments':
          projectedScore += action.months * 2.5;
          break;
        case 'new_account':
          projectedScore -= 10;
          break;
        default:
          break;
      }
    });

    return Math.max(300, Math.min(850, Math.round(projectedScore)));
  }
}