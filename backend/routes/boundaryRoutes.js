const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getStates,
  getDistrictsByState,
  getSubDistrictsByDistrict,
  getVillagesBySubDistrict,
  getVillagesByDistrict,
  getCities,
  searchBoundary,
  getNearbyBoundaries,
  createState,
  createDistrict,
  createSubDistrict,
  createVillage,
  createCity
} = require('../controllers/boundaryController');

// Public hierarchy lookups
router.get('/states', getStates);
router.get('/districts/:stateCode', getDistrictsByState);
router.get('/subdistricts/:districtCode', getSubDistrictsByDistrict);
router.get('/villages/:subDistrictCode', getVillagesBySubDistrict);
router.get('/villages-by-district/:districtCode', getVillagesByDistrict);
router.get('/cities', getCities);
router.get('/search', searchBoundary);
router.get('/nearby', getNearbyBoundaries);

// Admin administrative unit creation endpoints
router.post('/states', protect, authorize('Admin'), createState);
router.post('/districts', protect, authorize('Admin'), createDistrict);
router.post('/subdistricts', protect, authorize('Admin'), createSubDistrict);
router.post('/villages', protect, authorize('Admin'), createVillage);
router.post('/cities', protect, authorize('Admin'), createCity);

module.exports = router;
