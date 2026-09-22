const mongoose = require('mongoose');
const dotenv = require('dotenv');
const StateBoundary = require('./models/StateBoundary');
const DistrictBoundary = require('./models/DistrictBoundary');
const SubDistrictBoundary = require('./models/SubDistrictBoundary');
const VillageBoundary = require('./models/VillageBoundary');
const CityBoundary = require('./models/CityBoundary');

dotenv.config();

const seedBoundariesData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/geopolicy_nexus');
    console.log('[Seed Boundaries]: Connected to MongoDB...');

    // Drop or clear boundary collections
    await StateBoundary.deleteMany({});
    await DistrictBoundary.deleteMany({});
    await SubDistrictBoundary.deleteMany({});
    await VillageBoundary.deleteMany({});
    await CityBoundary.deleteMany({});

    console.log('[Seed Boundaries]: Cleared existing administrative boundary collections...');

    // 1. SEED STATES (LGD Codes & Census 2011 Codes)
    const states = await StateBoundary.create([
      {
        stateName: 'Maharashtra',
        stateCode: 'ST27',
        lgdCode: 27,
        censusCode: '27',
        type: 'State',
        capital: 'Mumbai',
        latitude: 19.7515,
        longitude: 75.7139,
        geometry: {
          type: 'Polygon',
          coordinates: [[[72.6, 15.6], [80.9, 15.6], [80.9, 22.0], [72.6, 22.0], [72.6, 15.6]]]
        }
      },
      {
        stateName: 'Karnataka',
        stateCode: 'ST29',
        lgdCode: 29,
        censusCode: '29',
        type: 'State',
        capital: 'Bengaluru',
        latitude: 15.3173,
        longitude: 75.7139,
        geometry: {
          type: 'Polygon',
          coordinates: [[[74.0, 11.5], [78.5, 11.5], [78.5, 18.5], [74.0, 18.5], [74.0, 11.5]]]
        }
      },
      {
        stateName: 'Gujarat',
        stateCode: 'ST24',
        lgdCode: 24,
        censusCode: '24',
        type: 'State',
        capital: 'Gandhinagar',
        latitude: 22.2587,
        longitude: 71.1924,
        geometry: {
          type: 'Polygon',
          coordinates: [[[68.1, 20.1], [74.4, 20.1], [74.4, 24.7], [68.1, 24.7], [68.1, 20.1]]]
        }
      },
      {
        stateName: 'Delhi',
        stateCode: 'ST07',
        lgdCode: 7,
        censusCode: '07',
        type: 'Union Territory',
        capital: 'New Delhi',
        latitude: 28.7041,
        longitude: 77.1025,
        geometry: {
          type: 'Polygon',
          coordinates: [[[76.8, 28.4], [77.3, 28.4], [77.3, 28.8], [76.8, 28.8], [76.8, 28.4]]]
        }
      }
    ]);

    console.log(`[Seed Boundaries]: Created ${states.length} State Administrative Boundaries.`);

    // 2. SEED DISTRICTS (Parent: State)
    const districts = await DistrictBoundary.create([
      // Maharashtra Districts
      {
        districtName: 'Pune',
        districtCode: 'DT2725',
        lgdCode: 521,
        censusCode: '521',
        stateCode: 'ST27',
        stateName: 'Maharashtra',
        headquarters: 'Pune City',
        latitude: 18.5204,
        longitude: 73.8567,
        geometry: {
          type: 'Polygon',
          coordinates: [[[73.3, 17.9], [75.1, 17.9], [75.1, 19.3], [73.3, 19.3], [73.3, 17.9]]]
        }
      },
      {
        districtName: 'Mumbai Suburban',
        districtCode: 'DT2721',
        lgdCode: 518,
        censusCode: '518',
        stateCode: 'ST27',
        stateName: 'Maharashtra',
        headquarters: 'Bandra',
        latitude: 19.0760,
        longitude: 72.8777,
        geometry: {
          type: 'Polygon',
          coordinates: [[[72.7, 18.9], [73.0, 18.9], [73.0, 19.3], [72.7, 19.3], [72.7, 18.9]]]
        }
      },
      // Karnataka Districts
      {
        districtName: 'Bengaluru Urban',
        districtCode: 'DT2920',
        lgdCode: 557,
        censusCode: '572',
        stateCode: 'ST29',
        stateName: 'Karnataka',
        headquarters: 'Bengaluru',
        latitude: 12.9716,
        longitude: 77.5946,
        geometry: {
          type: 'Polygon',
          coordinates: [[[77.3, 12.7], [77.8, 12.7], [77.8, 13.2], [77.3, 13.2], [77.3, 12.7]]]
        }
      },
      // Gujarat Districts
      {
        districtName: 'Ahmedabad',
        districtCode: 'DT2407',
        lgdCode: 474,
        censusCode: '474',
        stateCode: 'ST24',
        stateName: 'Gujarat',
        headquarters: 'Ahmedabad',
        latitude: 23.0225,
        longitude: 72.5714,
        geometry: {
          type: 'Polygon',
          coordinates: [[[71.9, 22.3], [73.0, 22.3], [73.0, 23.5], [71.9, 23.5], [71.9, 22.3]]]
        }
      }
    ]);

    console.log(`[Seed Boundaries]: Created ${districts.length} District Boundaries.`);

    // 3. SEED SUB-DISTRICTS / TEHSILS (Parent: District -> State)
    const subdistricts = await SubDistrictBoundary.create([
      // Pune District SubDistricts
      {
        subDistrictName: 'Haveli (Pimpri-Chinchwad & Hinjawadi)',
        subDistrictCode: 'SD272501',
        lgdCode: 4185,
        censusCode: '04185',
        districtCode: 'DT2725',
        districtName: 'Pune',
        stateCode: 'ST27',
        stateName: 'Maharashtra',
        latitude: 18.5912,
        longitude: 73.7389,
        geometry: {
          type: 'Polygon',
          coordinates: [[[73.6, 18.4], [73.9, 18.4], [73.9, 18.7], [73.6, 18.7], [73.6, 18.4]]]
        }
      },
      {
        subDistrictName: 'Baramati',
        subDistrictCode: 'SD272502',
        lgdCode: 4189,
        censusCode: '04189',
        districtCode: 'DT2725',
        districtName: 'Pune',
        stateCode: 'ST27',
        stateName: 'Maharashtra',
        latitude: 18.1517,
        longitude: 74.5770,
        geometry: {
          type: 'Polygon',
          coordinates: [[[74.4, 18.0], [74.8, 18.0], [74.8, 18.3], [74.4, 18.3], [74.4, 18.0]]]
        }
      },
      // Bengaluru Urban SubDistricts
      {
        subDistrictName: 'Bengaluru South',
        subDistrictCode: 'SD292001',
        lgdCode: 5562,
        censusCode: '05562',
        districtCode: 'DT2920',
        districtName: 'Bengaluru Urban',
        stateCode: 'ST29',
        stateName: 'Karnataka',
        latitude: 12.9141,
        longitude: 77.5855,
        geometry: {
          type: 'Polygon',
          coordinates: [[[77.5, 12.8], [77.7, 12.8], [77.7, 13.0], [77.5, 13.0], [77.5, 12.8]]]
        }
      }
    ]);

    console.log(`[Seed Boundaries]: Created ${subdistricts.length} SubDistrict (Tehsil/Taluka) Boundaries.`);

    // 4. SEED VILLAGES (Parent: SubDistrict -> District -> State)
    const villages = await VillageBoundary.create([
      // Villages under Haveli SubDistrict
      {
        villageName: 'Hinjawadi',
        villageCode: 'VIL556101',
        lgdCode: 556101,
        censusCode: '556101',
        subDistrictCode: 'SD272501',
        subDistrictName: 'Haveli',
        districtCode: 'DT2725',
        districtName: 'Pune',
        stateCode: 'ST27',
        stateName: 'Maharashtra',
        ulpinPrefix: 'IN-MH-272501-HIN',
        latitude: 18.5912,
        longitude: 73.7389,
        geometry: {
          type: 'Polygon',
          coordinates: [[[73.72, 18.58], [73.75, 18.58], [73.75, 18.61], [73.72, 18.61], [73.72, 18.58]]]
        }
      },
      {
        villageName: 'Maan',
        villageCode: 'VIL556102',
        lgdCode: 556102,
        censusCode: '556102',
        subDistrictCode: 'SD272501',
        subDistrictName: 'Haveli',
        districtCode: 'DT2725',
        districtName: 'Pune',
        stateCode: 'ST27',
        stateName: 'Maharashtra',
        ulpinPrefix: 'IN-MH-272501-MAN',
        latitude: 18.5775,
        longitude: 73.7088,
        geometry: {
          type: 'Polygon',
          coordinates: [[[73.69, 18.56], [73.72, 18.56], [73.72, 18.59], [73.69, 18.59], [73.69, 18.56]]]
        }
      },
      {
        villageName: 'Marunji',
        villageCode: 'VIL556103',
        lgdCode: 556103,
        censusCode: '556103',
        subDistrictCode: 'SD272501',
        subDistrictName: 'Haveli',
        districtCode: 'DT2725',
        districtName: 'Pune',
        stateCode: 'ST27',
        stateName: 'Maharashtra',
        ulpinPrefix: 'IN-MH-272501-MAR',
        latitude: 18.6080,
        longitude: 73.7220,
        geometry: {
          type: 'Polygon',
          coordinates: [[[73.71, 18.59], [73.74, 18.59], [73.74, 18.62], [73.71, 18.62], [73.71, 18.59]]]
        }
      },
      // Village under Bengaluru South SubDistrict
      {
        villageName: 'Whitefield Rural Hub',
        villageCode: 'VIL668201',
        lgdCode: 668201,
        censusCode: '668201',
        subDistrictCode: 'SD292001',
        subDistrictName: 'Bengaluru South',
        districtCode: 'DT2920',
        districtName: 'Bengaluru Urban',
        stateCode: 'ST29',
        stateName: 'Karnataka',
        ulpinPrefix: 'IN-KA-292001-WTF',
        latitude: 12.9698,
        longitude: 77.7499,
        geometry: {
          type: 'Polygon',
          coordinates: [[[77.73, 12.95], [77.77, 12.95], [77.77, 12.98], [77.73, 12.98], [77.73, 12.95]]]
        }
      }
    ]);

    console.log(`[Seed Boundaries]: Created ${villages.length} Village Boundaries with ULPIN prefixes & 2dsphere polygons.`);

    // 5. SEED CITIES (Urban / Smart City Corporations)
    const cities = await CityBoundary.create([
      {
        cityName: 'Pune Municipal Corporation (PMC)',
        cityCode: 'CT272501',
        lgdCode: 275210,
        censusCode: '802812',
        districtCode: 'DT2725',
        districtName: 'Pune',
        stateCode: 'ST27',
        stateName: 'Maharashtra',
        category: 'Metropolitan',
        population: 3124458,
        latitude: 18.5204,
        longitude: 73.8567,
        geometry: {
          type: 'Polygon',
          coordinates: [[[73.78, 18.44], [73.95, 18.44], [73.95, 18.58], [73.78, 18.58], [73.78, 18.44]]]
        }
      },
      {
        cityName: 'Bruhat Bengaluru Mahanagara Palike (BBMP)',
        cityCode: 'CT292001',
        lgdCode: 295570,
        censusCode: '803204',
        districtCode: 'DT2920',
        districtName: 'Bengaluru Urban',
        stateCode: 'ST29',
        stateName: 'Karnataka',
        category: 'Metropolitan',
        population: 8443675,
        latitude: 12.9716,
        longitude: 77.5946,
        geometry: {
          type: 'Polygon',
          coordinates: [[[77.48, 12.85], [77.72, 12.85], [77.72, 13.08], [77.48, 13.08], [77.48, 12.85]]]
        }
      },
      {
        cityName: 'Ahmedabad Municipal Corporation (AMC)',
        cityCode: 'CT240701',
        lgdCode: 244740,
        censusCode: '802490',
        districtCode: 'DT2407',
        districtName: 'Ahmedabad',
        stateCode: 'ST24',
        stateName: 'Gujarat',
        category: 'Smart City',
        population: 5577940,
        latitude: 23.0225,
        longitude: 72.5714,
        geometry: {
          type: 'Polygon',
          coordinates: [[[72.48, 22.95], [72.66, 22.95], [72.66, 23.12], [72.48, 23.12], [72.48, 22.95]]]
        }
      }
    ]);

    console.log(`[Seed Boundaries]: Created ${cities.length} City Municipal Boundaries.`);
    console.log('[Seed Boundaries]: All Administrative Boundary Collections & Indexes Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Boundaries Error]:', error);
    process.exit(1);
  }
};

seedBoundariesData();
