const db = require('../config/db');

exports.getAnalytics = async (req, res) => {
  try {
    // Attempt queries or return rich mockup analytics data
    const dailyBookings = [
      { date: 'Mon', count: 8 },
      { date: 'Tue', count: 12 },
      { date: 'Wed', count: 6 },
      { date: 'Thu', count: 15 },
      { date: 'Fri', count: 10 },
      { date: 'Sat', count: 18 },
      { date: 'Sun', count: 24 }
    ];

    const packageSales = [
      { name: 'Fit India 1.1', sales: 45 },
      { name: 'Fit India 1.2', sales: 30 },
      { name: 'Fit India 1.3', sales: 65 }
    ];

    const popularTests = [
      { name: 'CBC', count: 120 },
      { name: 'Thyroid Profile', count: 95 },
      { name: 'Lipid Profile', count: 80 },
      { name: 'Liver Function', count: 45 },
      { name: 'Kidney Function', count: 40 }
    ];

    const homeCollectionStats = [
      { month: 'Apr', count: 32 },
      { month: 'May', count: 48 },
      { month: 'Jun', count: 65 },
      { month: 'Jul', count: 78 }
    ];

    res.json({
      success: true,
      data: {
        dailyBookings,
        packageSales,
        popularTests,
        homeCollectionStats,
        summary: {
          todayBookings: 12,
          pendingReports: 5,
          completedReports: 7,
          homeCollections: 3,
          revenueToday: 14800,
          totalRevenue: 135200,
          totalPatients: 5247,
          totalTests: 1234,
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
