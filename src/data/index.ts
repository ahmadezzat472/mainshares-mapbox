import { IDataFilter, LocalBusiness } from "@/interfaces";

export const defaultLocalBusiness: LocalBusiness = {
  id: "",
  name: "",
  industry: "",
  companyAddress: "",
  companyPhone: "",
  description: "",
  email: "",
  website: "",
  logo: "",
  coverImage: "",
  lang: 0,
  lat: 0,
};

export const industryMapping: IDataFilter = {
  "Beauty & Personal Care": ["Other Beauty & Personal Care"],
  "Restaurants & Food": [
    "Pizza Restaurants",
    "Ice Cream & Frozen Yogurt Shops",
    "Food Trucks",
    "American Restaurants",
    "Diners",
  ],
  "Building & Construction": [
    "Roofing",
    "Landscaping & Yard Services",
    "Concrete",
    "Plumbing",
    "HVAC Businesses",
    "Structural Steel and Precast Concrete Contractors",
    "Site Preparation Contractors",
  ],
  "Health Care & Fitness": [
    "Dental Practices",
    "Surgical Appliance and Supplies Manufacturing",
  ],
  "Service Businesses": [
    "Cleaning Businesses",
    "Property Inspectors",
    "Specialized Automotive Repair",
  ],
  Retail: [
    "Warm Air Heating and Air-Conditioning Equipment and Supplies Merchant Wholesalers",
    "Sporting and Athletic Goods Manufacturing",
  ],
  Manufacturing: [
    "Wood Container and Pallet Manufacturing",
    "Unlaminated Plastics Film and Sheet (except Packaging) Manufacturing",
    "Switchgear and Switchboard Apparatus Manufacturing",
    "Special Die and Tool, Die Set, Jig, and Fixture Manufacturing",
    "Sign Manufacturing",
  ],
  Transportation: ["Specialized Freight (except Used Goods) Trucking, Local"],
  Other: [
    "Other Service Businesses",
    "Other - Not Listed",
    "Other Automotive & Boat",
  ],
};
