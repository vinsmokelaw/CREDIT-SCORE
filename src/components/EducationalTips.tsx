import React, { useState } from 'react';
import { BookOpen, Search, Filter, Clock, User, TrendingUp, CreditCard, Shield, Calculator, Award, ChevronRight, Star, CheckCircle } from 'lucide-react';
import { Card } from '../components/UI/Card'
import { Button } from '../components/UI/Button';

export function EducationalTips() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const educationalContent = [
    {
      id: 1,
      category: 'Credit Basics',
      title: 'Understanding Your Credit Score',
      content: 'Your credit score is a three-digit number that represents your creditworthiness. Scores typically range from 300-850, with higher scores indicating better credit health. This number is calculated based on your credit history and helps lenders determine your likelihood of repaying borrowed money.',
      fullContent: `Your credit score is one of the most important financial numbers in your life. It affects your ability to get loans, credit cards, and even impacts things like insurance rates and rental applications.

**What Makes Up Your Credit Score:**
- Payment History (35%): Your track record of making payments on time
- Credit Utilization (30%): How much of your available credit you're using
- Length of Credit History (15%): How long you've had credit accounts
- Credit Mix (10%): The variety of credit types you have
- New Credit (10%): Recent credit inquiries and new accounts

**Score Ranges:**
- 800-850: Excellent
- 740-799: Very Good
- 670-739: Good
- 580-669: Fair
- 300-579: Poor

Understanding these factors helps you make informed decisions about your credit management strategy.`,
      readTime: '5 min read',
      difficulty: 'Beginner',
      author: 'Credit Expert Team',
      rating: 4.8,
      views: 15420
    },
    {
      id: 2,
      category: 'Payment Tips',
      title: 'The Power of On-Time Payments',
      content: 'Payment history makes up 35% of your credit score, making it the most important factor. Even one late payment can drop your score by 60-110 points, depending on your current score and credit history.',
      fullContent: `Payment history is the single most important factor in your credit score calculation. Here's why it matters so much and how to master it:

**Why Payment History Matters:**
- It's 35% of your credit score
- Shows lenders your reliability
- Late payments can stay on your report for 7 years
- Even one 30-day late payment can significantly impact your score

**Types of Payments That Matter:**
- Credit cards
- Mortgages
- Auto loans
- Student loans
- Personal loans
- Some utility bills (if reported)

**Best Practices:**
- Set up automatic payments for at least the minimum amount
- Use calendar reminders for due dates
- Pay early when possible
- Contact lenders immediately if you'll be late
- Consider bi-weekly payments to stay ahead

**Recovery Tips:**
If you have late payments, focus on making all future payments on time. The impact of late payments decreases over time, and recent positive payment history can help rebuild your score.`,
      readTime: '4 min read',
      difficulty: 'Beginner',
      author: 'Payment Specialist',
      rating: 4.9,
      views: 12850
    },
    {
      id: 3,
      category: 'Credit Utilization',
      title: 'Optimal Credit Card Usage',
      content: 'Keep your credit utilization below 30% of your available credit. For the best scores, aim for under 10%. This ratio is calculated both per card and across all your cards combined.',
      fullContent: `Credit utilization is the second most important factor in your credit score, accounting for 30% of the calculation. Here's how to optimize it:

**What is Credit Utilization?**
Credit utilization is the percentage of your available credit that you're currently using. It's calculated both per individual card and across all your cards.

**Optimal Utilization Rates:**
- Under 10%: Excellent (best for your score)
- 10-30%: Good (acceptable range)
- 30-50%: Fair (may hurt your score)
- Over 50%: Poor (significantly impacts score)

**Strategies to Lower Utilization:**
1. **Pay balances before statement dates**
2. **Request credit limit increases**
3. **Spread balances across multiple cards**
4. **Make multiple payments per month**
5. **Keep old cards open to maintain available credit**

**Pro Tips:**
- Utilization is calculated monthly when statements close
- Paying off balances completely is ideal but not required
- Even if you pay in full each month, high statement balances can hurt your score
- Consider setting up balance alerts at 20% and 30% of your limit

**Common Mistakes:**
- Closing old credit cards (reduces available credit)
- Only making minimum payments
- Ignoring individual card utilization rates
- Not monitoring utilization regularly`,
      readTime: '6 min read',
      difficulty: 'Intermediate',
      author: 'Credit Utilization Expert',
      rating: 4.7,
      views: 9630
    },
    {
      id: 4,
      category: 'Building Credit',
      title: 'Building Credit from Scratch',
      content: 'If you have no credit history, consider a secured credit card, becoming an authorized user on someone else\'s account, or a credit-builder loan. These are safe ways to establish credit.',
      fullContent: `Building credit from scratch can seem daunting, but there are several proven strategies to establish a solid credit foundation:

**Starting Options:**

**1. Secured Credit Cards**
- Require a security deposit (usually $200-$500)
- Deposit typically equals your credit limit
- Use like a regular credit card
- Many graduate to unsecured cards after 6-12 months
- Look for cards that report to all three credit bureaus

**2. Authorized User Status**
- Ask a trusted family member or friend to add you
- Their payment history affects your credit
- Choose someone with excellent payment history
- You can be removed at any time

**3. Credit-Builder Loans**
- Small loans (usually $300-$1,000) held in a savings account
- You make monthly payments
- Receive the money after paying off the loan
- Builds payment history and savings simultaneously

**4. Student Credit Cards**
- Designed for college students with limited credit
- Often have lower approval requirements
- May offer rewards and educational resources
- Usually have lower credit limits initially

**Timeline Expectations:**
- Month 1-3: Accounts appear on credit report
- Month 3-6: Initial credit score generated
- Month 6-12: Score stabilizes and improves with good habits
- Year 1+: Eligible for better credit products

**Best Practices:**
- Start with one account and use it responsibly
- Keep utilization low (under 30%, ideally under 10%)
- Make all payments on time
- Monitor your credit report regularly
- Be patient - building credit takes time`,
      readTime: '7 min read',
      difficulty: 'Beginner',
      author: 'Credit Building Specialist',
      rating: 4.6,
      views: 11240
    },
    {
      id: 5,
      category: 'Credit Monitoring',
      title: 'How to Monitor Your Credit Effectively',
      content: 'Regular credit monitoring helps you catch errors, identity theft, and track your progress. You\'re entitled to free credit reports from all three bureaus annually, and many services offer free credit score monitoring.',
      fullContent: `Effective credit monitoring is essential for maintaining good credit health and protecting yourself from identity theft:

**Free Monitoring Options:**

**1. Annual Credit Reports**
- Visit annualcreditreport.com (official site)
- Free report from each bureau once per year
- Stagger requests (one every 4 months) for year-round monitoring
- Check for errors, unfamiliar accounts, and incorrect information

**2. Credit Card and Bank Monitoring**
- Many credit cards offer free FICO scores
- Banks often provide credit monitoring services
- Usually updated monthly
- Some offer alerts for significant changes

**3. Free Credit Monitoring Services**
- Credit Karma, Credit Sesame, and others
- Provide scores and basic monitoring
- May use VantageScore instead of FICO
- Often include identity monitoring features

**What to Monitor:**

**Personal Information:**
- Name, address, Social Security number
- Employment information
- Date of birth

**Account Information:**
- All credit accounts (open and closed)
- Credit limits and balances
- Payment history
- Account opening dates

**Credit Inquiries:**
- Hard inquiries (affect your score)
- Soft inquiries (don't affect score)
- Unfamiliar inquiries may indicate fraud

**Public Records:**
- Bankruptcies
- Tax liens
- Civil judgments

**Red Flags to Watch For:**
- Accounts you didn't open
- Incorrect payment history
- Wrong balances or credit limits
- Unfamiliar addresses
- Suspicious inquiries

**Action Steps for Errors:**
1. Document the error with screenshots
2. Contact the credit bureau in writing
3. Contact the creditor reporting the error
4. Follow up within 30 days
5. Keep records of all correspondence

**Monitoring Schedule:**
- Check credit reports: Every 4 months
- Review credit scores: Monthly
- Monitor accounts: Weekly
- Set up alerts: For all significant changes`,
      readTime: '8 min read',
      difficulty: 'Intermediate',
      author: 'Credit Monitoring Expert',
      rating: 4.8,
      views: 8750
    },
    {
      id: 6,
      category: 'Debt Management',
      title: 'Strategies for Paying Down Debt',
      content: 'Two popular debt payoff strategies are the debt snowball (paying smallest balances first) and debt avalanche (paying highest interest rates first). Choose the method that best fits your personality and financial situation.',
      fullContent: `Effective debt management is crucial for improving your credit score and financial health. Here are proven strategies:

**Debt Payoff Strategies:**

**1. Debt Avalanche Method**
- Pay minimums on all debts
- Put extra money toward highest interest rate debt
- Mathematically optimal (saves most money)
- Best for disciplined individuals focused on numbers

**2. Debt Snowball Method**
- Pay minimums on all debts
- Put extra money toward smallest balance
- Provides psychological wins and motivation
- Best for those who need encouragement

**3. Debt Consolidation**
- Combine multiple debts into one payment
- Potentially lower interest rate
- Simplifies payment management
- Options include personal loans or balance transfers

**Creating a Debt Payoff Plan:**

**Step 1: List All Debts**
- Balance owed
- Minimum payment
- Interest rate
- Due date

**Step 2: Choose Your Strategy**
- Consider your personality and motivation style
- Calculate potential savings with each method
- Commit to one approach

**Step 3: Find Extra Money**
- Review your budget for cuts
- Consider side income
- Use windfalls (tax refunds, bonuses)
- Sell unused items

**Step 4: Automate Payments**
- Set up automatic minimum payments
- Schedule extra payments
- Use calendar reminders

**Credit Score Impact:**
- Lower balances improve credit utilization
- Consistent payments build positive history
- Closed accounts may temporarily lower score
- Long-term benefits outweigh short-term impacts

**Common Mistakes to Avoid:**
- Closing credit cards after paying them off
- Taking on new debt while paying off old debt
- Only making minimum payments
- Not having an emergency fund
- Ignoring the emotional aspects of debt

**Staying Motivated:**
- Track progress visually
- Celebrate milestones
- Find an accountability partner
- Remember your "why"
- Focus on the freedom debt payoff brings`,
      readTime: '9 min read',
      difficulty: 'Intermediate',
      author: 'Debt Management Counselor',
      rating: 4.7,
      views: 10320
    },
    {
      id: 7,
      category: 'Advanced Strategies',
      title: 'Credit Optimization for High Scores',
      content: 'Advanced techniques for achieving and maintaining excellent credit scores (800+) include strategic credit applications, optimizing credit mix, and understanding the nuances of credit scoring models.',
      fullContent: `Achieving and maintaining a credit score above 800 requires advanced strategies and deep understanding of credit scoring:

**Advanced Optimization Techniques:**

**1. Perfect Utilization Management**
- Keep overall utilization under 10%
- Maintain 1-3% utilization on one card
- Keep other cards at 0% reported balance
- Time payments to optimize statement dates

**2. Strategic Credit Mix**
- Maintain 3-5 credit cards
- Have at least one installment loan
- Consider different types of credit
- Don't close old accounts unnecessarily

**3. Inquiry Management**
- Space applications 6+ months apart
- Use pre-qualification tools
- Understand inquiry shopping windows
- Monitor inquiry removal dates

**4. Account Age Optimization**
- Keep oldest accounts open
- Use old cards occasionally to keep them active
- Understand average account age impact
- Plan new accounts strategically

**Advanced Monitoring:**

**1. Multi-Bureau Tracking**
- Monitor all three bureaus regularly
- Understand bureau-specific differences
- Know which lenders report to which bureaus
- Optimize for your target lender's preferred bureau

**2. Score Model Understanding**
- FICO vs. VantageScore differences
- Industry-specific scores (auto, mortgage)
- Version differences (FICO 8, 9, 10)
- Lender-specific preferences

**3. Timing Strategies**
- Understand reporting cycles
- Time applications for optimal scores
- Plan major purchases around credit needs
- Coordinate with life events

**Maintenance Strategies:**

**1. Regular Account Management**
- Use all cards at least quarterly
- Rotate which card carries small balance
- Monitor for account closures
- Request credit limit increases annually

**2. Proactive Error Management**
- Dispute errors immediately
- Maintain documentation
- Follow up on disputes
- Use goodwill letters for minor issues

**3. Long-term Planning**
- Align credit strategy with life goals
- Plan for major purchases
- Understand credit needs for different life stages
- Build relationships with preferred lenders

**Expert Tips:**
- Scores above 800 have diminishing returns
- Focus on maintaining rather than maximizing
- Understand that perfect scores aren't necessary
- Balance credit optimization with overall financial health

**Common Advanced Mistakes:**
- Over-optimizing at the expense of financial goals
- Closing accounts to "clean up" credit report
- Applying for credit too frequently
- Ignoring the human element in lending decisions`,
      readTime: '12 min read',
      difficulty: 'Advanced',
      author: 'Credit Optimization Specialist',
      rating: 4.9,
      views: 6890
    },
    {
      id: 8,
      category: 'Identity Protection',
      title: 'Protecting Your Credit from Identity Theft',
      content: 'Identity theft can devastate your credit score. Learn how to protect your personal information, recognize signs of identity theft, and respond quickly if your identity is compromised.',
      fullContent: `Identity theft is one of the fastest ways your credit can be damaged. Here's how to protect yourself and respond to threats:

**Prevention Strategies:**

**1. Secure Your Information**
- Shred financial documents
- Use secure passwords and 2FA
- Be cautious with public Wi-Fi
- Monitor your mail and online accounts
- Limit sharing personal information

**2. Credit Freezes and Locks**
- Place security freezes with all three bureaus
- Use credit locks for temporary protection
- Understand the difference between freezes and locks
- Know how to lift freezes for legitimate applications

**3. Fraud Alerts**
- Initial fraud alerts (90 days)
- Extended fraud alerts (7 years)
- Active duty alerts for military
- Automatic alerts from monitoring services

**Warning Signs:**

**Credit Report Red Flags:**
- Unfamiliar accounts or inquiries
- Incorrect personal information
- Accounts you didn't open
- Payments you didn't make

**Other Warning Signs:**
- Bills for accounts you didn't open
- Calls from debt collectors about unknown debts
- Missing mail or statements
- Denied credit unexpectedly
- IRS notices about unreported income

**Immediate Response Steps:**

**1. First 24 Hours**
- Place fraud alerts with credit bureaus
- Contact affected financial institutions
- File a police report
- Document everything

**2. First Week**
- Review all credit reports thoroughly
- Close compromised accounts
- Change passwords and PINs
- Contact other potentially affected accounts

**3. Ongoing Recovery**
- Monitor credit reports closely
- Dispute fraudulent information
- Keep detailed records
- Follow up on all disputes and reports

**Recovery Process:**

**1. Dispute Fraudulent Information**
- Contact credit bureaus in writing
- Provide supporting documentation
- Follow up within 30 days
- Keep copies of all correspondence

**2. Work with Creditors**
- Contact fraud departments directly
- Request fraud affidavits
- Get written confirmation of account closures
- Ask for "paid as agreed" status on resolved accounts

**3. Legal Protections**
- Fair Credit Reporting Act (FCRA) rights
- Fair Debt Collection Practices Act (FDCPA)
- Identity Theft and Assumption Deterrence Act
- State-specific identity theft laws

**Long-term Protection:**

**1. Ongoing Monitoring**
- Regular credit report reviews
- Credit monitoring services
- Bank and credit card alerts
- Social Security Administration monitoring

**2. Documentation**
- Keep identity theft reports
- Maintain correspondence files
- Document recovery timeline
- Save proof of resolution

**3. Prevention Habits**
- Regular password updates
- Secure document disposal
- Careful information sharing
- Ongoing education about new threats

**Resources:**
- IdentityTheft.gov (FTC resource)
- Credit bureau fraud departments
- Local law enforcement
- Identity theft support groups`,
      readTime: '10 min read',
      difficulty: 'Intermediate',
      author: 'Identity Protection Expert',
      rating: 4.8,
      views: 7450
    }
  ];

  const categories = [
    { id: 'all', label: 'All Topics', count: educationalContent.length },
    { id: 'Credit Basics', label: 'Credit Basics', count: educationalContent.filter(item => item.category === 'Credit Basics').length },
    { id: 'Payment Tips', label: 'Payment Tips', count: educationalContent.filter(item => item.category === 'Payment Tips').length },
    { id: 'Credit Utilization', label: 'Credit Utilization', count: educationalContent.filter(item => item.category === 'Credit Utilization').length },
    { id: 'Building Credit', label: 'Building Credit', count: educationalContent.filter(item => item.category === 'Building Credit').length },
    { id: 'Credit Monitoring', label: 'Credit Monitoring', count: educationalContent.filter(item => item.category === 'Credit Monitoring').length },
    { id: 'Debt Management', label: 'Debt Management', count: educationalContent.filter(item => item.category === 'Debt Management').length },
    { id: 'Advanced Strategies', label: 'Advanced Strategies', count: educationalContent.filter(item => item.category === 'Advanced Strategies').length },
    { id: 'Identity Protection', label: 'Identity Protection', count: educationalContent.filter(item => item.category === 'Identity Protection').length }
  ];

  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' }
  ];

  const filteredContent = educationalContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success-100 text-success-800';
      case 'Intermediate': return 'bg-warning-100 text-warning-800';
      case 'Advanced': return 'bg-error-100 text-error-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Credit Basics': return <BookOpen className="h-4 w-4" />;
      case 'Payment Tips': return <Clock className="h-4 w-4" />;
      case 'Credit Utilization': return <CreditCard className="h-4 w-4" />;
      case 'Building Credit': return <TrendingUp className="h-4 w-4" />;
      case 'Credit Monitoring': return <Shield className="h-4 w-4" />;
      case 'Debt Management': return <Calculator className="h-4 w-4" />;
      case 'Advanced Strategies': return <Award className="h-4 w-4" />;
      case 'Identity Protection': return <Shield className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Credit Education Center
          </h1>
          <p className="text-gray-600">
            Learn everything you need to know about credit scores, credit management, and financial health
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Articles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {educationalContent.slice(0, 3).map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="text-primary-600">
                    {getCategoryIcon(article.category)}
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                    {article.category}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(article.difficulty)}`}>
                    {article.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.content}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {article.author}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-500" />
                    {article.rating}
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Read Full Article
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* All Articles */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              All Articles ({filteredContent.length})
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
                <option>Reading Time</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="text-primary-600">
                    {getCategoryIcon(article.category)}
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                    {article.category}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(article.difficulty)}`}>
                    {article.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.content}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      {article.rating}
                    </div>
                  </div>
                  <span>{article.views.toLocaleString()} views</span>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Read Article
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Reference Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Reference</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Score Ranges</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Excellent (800-850)</span>
                  <span className="text-success-600 font-medium">Best rates</span>
                </div>
                <div className="flex justify-between">
                  <span>Very Good (740-799)</span>
                  <span className="text-success-600 font-medium">Above average</span>
                </div>
                <div className="flex justify-between">
                  <span>Good (670-739)</span>
                  <span className="text-warning-600 font-medium">Near average</span>
                </div>
                <div className="flex justify-between">
                  <span>Fair (580-669)</span>
                  <span className="text-warning-600 font-medium">Below average</span>
                </div>
                <div className="flex justify-between">
                  <span>Poor (300-579)</span>
                  <span className="text-error-600 font-medium">Highest rates</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Factors</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Payment History</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit Utilization</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit History Length</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit Mix</span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="flex justify-between">
                  <span>New Credit</span>
                  <span className="font-medium">10%</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Pay all bills on time, every time</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Keep credit utilization below 30%</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Don't close old credit accounts</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Monitor your credit report regularly</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Limit new credit applications</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}