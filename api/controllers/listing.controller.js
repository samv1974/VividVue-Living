import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    console.log(req.body);
    const listing = await Listing.create(req.body);
    console.log(listing);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    console.log("we are in getListing",req.params.id);
    console.log("we are in getListing2",req.params);
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    console.log(listing);
    console.log("this is after fetching listing",listing);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

export const getListings = async (req, res) => {
  const query = req.query;
  const limit = parseInt(query.limit) || 9;
  const startIndex = parseInt(query.startIndex) || 0;
  let city = query.city; // Changed to lowercase
  const minPrice = parseInt(query.minPrice);
  const maxPrice = parseInt(query.maxPrice);
  let bedroom = query.bedroom;

  let sortOptions = {};
  if (query.order) {
    const [field, sortOrder] = query.order.split('_');
    sortOptions[field] = sortOrder === 'desc' ? -1 : 1;
  }else{
    sortOptions = { Price: -1 };
  }
  

  if(bedroom=="any"||bedroom==""||bedroom==NaN){
    bedroom = { $in:[1,2,3,4,5,6,7,8,9]}
  }
  else{
    bedroom=parseInt(bedroom);
  }
  const property = query.property; // Changed to lowercase
  let type = query.type;
  
  if(type=='any'){
    type = { $in: ["sale", "rent"] };
  }

  if(city==""){
    city = { $exists: true };
  }
  
  console.log("this is bedroom",bedroom)
  try {
    console.log("this is the query", query);
    const posts = await Listing.find({
      City:city, // Changed to lowercase
      type:type,
      Property:property, // Changed to lowercase
      Price: {
        $gte: minPrice,
        $lte: maxPrice
      },
      bedrooms: bedroom
    })
      .sort(sortOptions)
      .limit(limit)
      .skip(startIndex);

    // console.log("These posts have been fetched", posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

