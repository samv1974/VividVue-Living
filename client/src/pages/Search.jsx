import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../Components/ListingItem";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "any",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "House",
    minPrice: searchParams.get("minPrice") || 2,
    maxPrice: searchParams.get("maxPrice") || 200000,
    bedroom: searchParams.get("bedroom") || "any",
    sort: 'created_at',
    order: searchParams.get("Sorting")||'desc',
  });

  useEffect(() => {
    fetchListings();
  }, [searchParams]); // Refetch listings when searchParams change

  const fetchListings = async () => {
    setLoading(true);
    try {
      // Construct the query string
      const queryString = new URLSearchParams(query).toString();
      // Fetch listings based on the query
      console.log("this is query string",queryString);
      const res = await fetch(`/api/listing/get?${queryString}`);
      console.log(res);
      const data = await res.json();
      // Update the state with fetched listings
      setListings(data);
      // Determine whether to show the "Show more" button based on the length of fetched data
      setShowMore(data.length > 8);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangee = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  const onShowMoreClick = async () => {
    setLoading(true);
    try {
      const numberOfListings = listings.length;
      const startIndex = numberOfListings;
      const urlParams = new URLSearchParams(query);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();
      console.log("this is show more",searchQuery);
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings([...listings, ...data]);
      setShowMore(data.length > 8);
    } catch (error) {
      console.error("Error fetching more listings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleChangee} className="flex flex-col gap-8">
          <h1>
                Search results for <b>{searchParams.get("city")}</b>
              </h1>
          <div className="flex space-y-5 flex-col">
              
                <div className="flex flex-row space-x-5">
                  <label htmlFor="city">Location</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City Location"
                    onChange={handleChangee}
                    defaultValue={query.city}
                  />
                </div>
                <div className="flex flex-row space-x-5">
                <div className="item">
                  <label htmlFor="type">Type</label>
                  <select
                    name="type"
                    id="type"
                    onChange={handleChangee}
                    defaultValue={query.type}
                  >
                    <option value="">any</option>
                    <option value="sale">sale</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="property">Property</label>
                  <select
                    name="property"
                    id="property"
                    onChange={handleChangee}
                    defaultValue={query.property}
                  >
                    <option value="">any</option>
                    <option value="apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                </div>
                <div className="flex flex-row space-x-5">
                  <label htmlFor="minPrice">Min Price</label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    placeholder="any"
                    onChange={handleChangee}
                    defaultValue={query.minPrice}
                  />
                </div>
                <div className="flex flex-row space-x-5">
                  <label htmlFor="maxPrice">Max Price</label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="any"
                    onChange={handleChangee}
                    defaultValue={query.maxPrice}
                  />
                </div>
                <div className="flex flex-row space-x-5">
                  <label htmlFor="bedroom">Bedroom</label>
                  <input
                    type="number"
                    id="bedroom"
                    name="bedroom"
                    placeholder="any"
                    onChange={handleChangee}
                    defaultValue={query.bedroom}
                  />
                </div>
                <button onClick={handleFilter}>
                  <img src="/search.png" alt="" />
                </button>
              
            </div>
          
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
              <select
                onChange={handleChangee}
                id="sort_order"
                className="border rounded-lg p-3"
                name="Sorting"
              >
              <option value="Price_desc">Price high to low</option>
              <option value="Price_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4 ">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
