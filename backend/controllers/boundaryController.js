const StateBoundary = require('../models/StateBoundary');
const DistrictBoundary = require('../models/DistrictBoundary');
const SubDistrictBoundary = require('../models/SubDistrictBoundary');
const VillageBoundary = require('../models/VillageBoundary');
const CityBoundary = require('../models/CityBoundary');

// @desc    Get all Indian States
// @route   GET /api/boundaries/states
// @access  Public
exports.getStates = async (req, res) => {
  try {
    const states = await StateBoundary.find({}).sort({ stateName: 1 });
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Districts under a State Code or ID
// @route   GET /api/boundaries/districts/:stateCode
// @access  Public
exports.getDistrictsByState = async (req, res) => {
  try {
    const { stateCode } = req.params;
    const districts = await DistrictBoundary.find({
      $or: [{ stateCode: stateCode }, { _id: stateCode.match(/^[0-9a-fA-F]{24}$/) ? stateCode : null }]
    }).sort({ districtName: 1 });
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get SubDistricts (Tehsils/Taluks) under a District Code or ID
// @route   GET /api/boundaries/subdistricts/:districtCode
// @access  Public
exports.getSubDistrictsByDistrict = async (req, res) => {
  try {
    const { districtCode } = req.params;
    const subdistricts = await SubDistrictBoundary.find({
      $or: [{ districtCode: districtCode }, { _id: districtCode.match(/^[0-9a-fA-F]{24}$/) ? districtCode : null }]
    }).sort({ subDistrictName: 1 });
    res.json(subdistricts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Villages under a SubDistrict (Tehsil) Code
// @route   GET /api/boundaries/villages/:subDistrictCode
// @access  Public
exports.getVillagesBySubDistrict = async (req, res) => {
  try {
    const { subDistrictCode } = req.params;
    const villages = await VillageBoundary.find({
      $or: [{ subDistrictCode: subDistrictCode }, { _id: subDistrictCode.match(/^[0-9a-fA-F]{24}$/) ? subDistrictCode : null }]
    }).sort({ villageName: 1 });
    res.json(villages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Villages under a District Code directly
// @route   GET /api/boundaries/villages-by-district/:districtCode
// @access  Public
exports.getVillagesByDistrict = async (req, res) => {
  try {
    const { districtCode } = req.params;
    const villages = await VillageBoundary.find({
      $or: [{ districtCode: districtCode }, { _id: districtCode.match(/^[0-9a-fA-F]{24}$/) ? districtCode : null }]
    }).sort({ villageName: 1 });
    res.json(villages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Cities with optional stateCode or category filter
// @route   GET /api/boundaries/cities
// @access  Public
exports.getCities = async (req, res) => {
  try {
    const { stateCode, category } = req.query;
    let query = {};
    if (stateCode) query.stateCode = stateCode;
    if (category) query.category = category;

    const cities = await CityBoundary.find(query).sort({ cityName: 1 });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search administrative unit by LGD Code or Census Code
// @route   GET /api/boundaries/search
// @access  Public
exports.searchBoundary = async (req, res) => {
  try {
    const { lgdCode, censusCode, name } = req.query;

    let results = { states: [], districts: [], subDistricts: [], villages: [], cities: [] };

    if (lgdCode) {
      const numLgd = Number(lgdCode);
      results.states = await StateBoundary.find({ lgdCode: numLgd });
      results.districts = await DistrictBoundary.find({ lgdCode: numLgd });
      results.subDistricts = await SubDistrictBoundary.find({ lgdCode: numLgd });
      results.villages = await VillageBoundary.find({ lgdCode: numLgd });
      results.cities = await CityBoundary.find({ lgdCode: numLgd });
    } else if (censusCode) {
      results.states = await StateBoundary.find({ censusCode });
      results.districts = await DistrictBoundary.find({ censusCode });
      results.subDistricts = await SubDistrictBoundary.find({ censusCode });
      results.villages = await VillageBoundary.find({ censusCode });
      results.cities = await CityBoundary.find({ censusCode });
    } else if (name) {
      const regex = new RegExp(name, 'i');
      results.states = await StateBoundary.find({ stateName: regex });
      results.districts = await DistrictBoundary.find({ districtName: regex });
      results.subDistricts = await SubDistrictBoundary.find({ subDistrictName: regex });
      results.villages = await VillageBoundary.find({ villageName: regex });
      results.cities = await CityBoundary.find({ cityName: regex });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Perform 2dsphere spatial lookup by coordinates
// @route   GET /api/boundaries/nearby
// @access  Public
exports.getNearbyBoundaries = async (req, res) => {
  try {
    const { lat, lng, maxDistanceMeters = 50000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude (lat) and Longitude (lng) are required parameters' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    const nearbyVillages = await VillageBoundary.find({
      geometry: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: parseInt(maxDistanceMeters)
        }
      }
    }).limit(10);

    const nearbyCities = await CityBoundary.find({
      geometry: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: parseInt(maxDistanceMeters)
        }
      }
    }).limit(10);

    res.json({
      queryLocation: { latitude, longitude },
      villages: nearbyVillages,
      cities: nearbyCities
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Mutations
exports.createState = async (req, res) => {
  try {
    const newState = await StateBoundary.create(req.body);
    res.status(201).json(newState);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createDistrict = async (req, res) => {
  try {
    const newDistrict = await DistrictBoundary.create(req.body);
    res.status(201).json(newDistrict);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createSubDistrict = async (req, res) => {
  try {
    const newSubDistrict = await SubDistrictBoundary.create(req.body);
    res.status(201).json(newSubDistrict);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createVillage = async (req, res) => {
  try {
    const newVillage = await VillageBoundary.create(req.body);
    res.status(201).json(newVillage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createCity = async (req, res) => {
  try {
    const newCity = await CityBoundary.create(req.body);
    res.status(201).json(newCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
