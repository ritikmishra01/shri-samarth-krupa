const AppointmentModel = require('../models/appointmentModel');

/**
 * @desc    Get all appointments (admin, with filters & pagination)
 * @route   GET /api/appointments
 * @access  Private/Admin
 */
const getAll = async (req, res, next) => {
  try {
    const { status, date, page = 1, limit = 20 } = req.query;
    const result = await AppointmentModel.getAll({ status, date, page, limit });
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get appointment stats (admin dashboard)
 * @route   GET /api/appointments/stats
 * @access  Private/Admin
 */
const getStats = async (req, res, next) => {
  try {
    const stats = await AppointmentModel.getStats();
    const byMonth = await AppointmentModel.countByMonth();
    const byTest = await AppointmentModel.countByTest();
    res.status(200).json({ success: true, data: { ...stats, byMonth, byTest } });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single appointment by ID
 * @route   GET /api/appointments/:id
 * @access  Private/Admin
 */
const getById = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.getById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: 'Appointment not found' });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create new appointment (public)
 * @route   POST /api/appointments
 * @access  Public
 */
const create = async (req, res, next) => {
  try {
    const { patient_name, mobile, preferred_date } = req.body;

    if (!patient_name || !mobile || !preferred_date) {
      return res.status(400).json({
        success: false,
        message: 'Patient name, mobile number, and preferred date are required',
      });
    }

    // Validate mobile (10 digit Indian number)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit Indian mobile number',
      });
    }

    const id = await AppointmentModel.create(req.body);
    const newAppointment = await AppointmentModel.getById(id);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully. We will contact you shortly.',
      data: newAppointment,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update appointment
 * @route   PUT /api/appointments/:id
 * @access  Private/Admin
 */
const update = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.getById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: 'Appointment not found' });
    }

    const affected = await AppointmentModel.update(req.params.id, req.body);
    if (!affected) {
      return res
        .status(400)
        .json({ success: false, message: 'No changes made' });
    }

    const updated = await AppointmentModel.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update appointment status
 * @route   PUT /api/appointments/:id/status
 * @access  Private/Admin
 */
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const appointment = await AppointmentModel.getById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: 'Appointment not found' });
    }

    await AppointmentModel.updateStatus(req.params.id, status);
    res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}`,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete appointment
 * @route   DELETE /api/appointments/:id
 * @access  Private/Admin
 */
const remove = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.getById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: 'Appointment not found' });
    }

    await AppointmentModel.delete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getStats, getById, create, update, updateStatus, remove };
