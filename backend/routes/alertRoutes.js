const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

// Route to create a new alert
router.post('/create', alertController.createAlert);

// Route to get all alerts
router.get('/all', alertController.getAlerts);

// Route to delete an alert by ID
router.delete('/delete/:id', alertController.deleteAlert);

// Route to manually trigger alert checks (useful for testing or cron jobs)
router.get('/check', async (req, res) => {
    try {
        await alertController.checkAlerts();
        res.status(200).json({ message: 'Alerts checked successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error checking alerts' });
    }
});

module.exports = router;
