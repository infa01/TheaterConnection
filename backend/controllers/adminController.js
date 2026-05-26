const adminService = require('../services/adminService');

const createShow = async (req, res) => {
    try {
        const {
        theatre_id,
        title,
        description,
        duration,
        age_rating
        } = req.body || {};

        if (!theatre_id || !title || !duration) {
        return res.status(400).json({
            success: false,
            message: 'theatre_id, title and duration are required'
        });
        }

        const showId = await adminService.createShow({
        theatre_id,
        title,
        description,
        duration,
        age_rating
        });

        res.status(201).json({
        success: true,
        message: 'Show created successfully',
        show_id: showId
        });

    } catch (error) {
        console.error('Create show error:', error);

        res.status(500).json({
        success: false,
        message: 'Failed to create show',
        error: error.message
        });
    }
};

const createShowtime = async (req, res) => {
    try {
        const {
        show_id,
        show_date,
        show_time,
        hall,
        price
        } = req.body || {};

        if (!show_id || !show_date || !show_time || !hall || !price) {
        return res.status(400).json({
            success: false,
            message: 'show_id, show_date, show_time, hall and price are required'
        });
        }

        const showtimeId = await adminService.createShowtime({
        show_id,
        show_date,
        show_time,
        hall,
        price
        });

        res.status(201).json({
        success: true,
        message: 'Showtime created successfully',
        showtime_id: showtimeId
        });

    } catch (error) {
        console.error('Create showtime error:', error);

        res.status(500).json({
        success: false,
        message: 'Failed to create showtime',
        error: error.message
        });
    }
};

const deactivateShow = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await adminService.updateShowStatus(id, 'inactive');

        if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'Show not found'
        });
        }

        res.status(200).json({
        success: true,
        message: 'Show deactivated successfully'
        });

    } catch (error) {
        console.error('Deactivate show error:', error);

        res.status(500).json({
        success: false,
        message: 'Failed to deactivate show',
        error: error.message
        });
    }
};

const activateShow = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await adminService.updateShowStatus(id, 'active');

        if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'Show not found'
        });
        }

        res.status(200).json({
        success: true,
        message: 'Show activated successfully'
        });

    } catch (error) {
        console.error('Activate show error:', error);

        res.status(500).json({
        success: false,
        message: 'Failed to activate show',
        error: error.message
        });
    }
};

const deactivateShowtime = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await adminService.updateShowtimeStatus(id, 'inactive');

        if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'Showtime not found'
        });
        }

        res.status(200).json({
        success: true,
        message: 'Showtime deactivated successfully'
        });

    } catch (error) {
        console.error('Deactivate showtime error:', error);

        res.status(500).json({
        success: false,
        message: 'Failed to deactivate showtime',
        error: error.message
        });
    }
};

const activateShowtime = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await adminService.updateShowtimeStatus(id, 'active');

        if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'Showtime not found'
        });
        }

        res.status(200).json({
        success: true,
        message: 'Showtime activated successfully'
        });

    } catch (error) {
        console.error('Activate showtime error:', error);

        res.status(500).json({
        success: false,
        message: 'Failed to activate showtime',
        error: error.message
        });
    }
};

const getAllShowsAdmin = async (req, res) => {
    try {
        const shows = await adminService.getAllShowsAdmin();

        res.status(200).json({
        success: true,
        count: shows.length,
        data: shows
        });

    } catch (error) {
        console.error('Fetch admin shows error:', error);

        res.status(500).json({
        success: false,
        message: 'Failed to fetch admin shows',
        error: error.message
        });
    }
};

const getAllShowtimesAdmin = async (req, res) => {
    try {
        const showtimes = await adminService.getAllShowtimesAdmin();

        res.status(200).json({
            success: true,
            count: showtimes.length,
            data: showtimes
        });

    } catch (error) {
        console.error('Fetch admin showtimes error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to fetch admin showtimes',
            error: error.message
        });
    }
};

module.exports = {
    createShow,
    createShowtime,
    deactivateShow,
    deactivateShowtime,
    getAllShowsAdmin,
    activateShow,
    getAllShowtimesAdmin,
    activateShowtime
};