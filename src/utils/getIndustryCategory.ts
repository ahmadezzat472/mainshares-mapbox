export const getIndustryCategory = (industry: string) => {
  const categoryMappings: { [key: string]: string } = {
    // Automotive & Boat
    "Automotive": "Automotive",
    "Boat": "Automotive",
    "Specialized Automotive Repair": "Automotive",
    "Other Automotive & Boat": "Automotive",

    // Construction & Contractors
    "Construction": "Construction & Contractors",
    "Building & Construction": "Construction & Contractors",
    "General Contractors": "Construction & Contractors",
    "Concrete": "Construction & Contractors",
    "Structural Steel and Precast Concrete Contractors": "Construction & Contractors",
    "Roofing": "Construction & Contractors",
    "Site Preparation Contractors": "Construction & Contractors",
    "Water and Sewer Line and Related Structures Construction": "Construction & Contractors",

    // Food & Drinks
    "Food": "Food & Drinks",
    "Restaurants": "Food & Drinks",
    "Pizza Restaurants": "Food & Drinks",
    "Diners": "Food & Drinks",
    "Food Trucks": "Food & Drinks",
    "Ice Cream & Frozen Yogurt Shops": "Food & Drinks",
    "American Restaurants": "Food & Drinks",
    "Food & Related products": "Food & Drinks",

    // Health & Medicine
    "Health": "Health & Medicine",
    "Health Care & Fitness": "Health & Medicine",
    "Dental": "Health & Medicine",
    "Dental Practices": "Health & Medicine",
    "Surgical Appliance and Supplies Manufacturing": "Health & Medicine",
    "Surgical and Medical Instrument Manufacturing": "Health & Medicine",

    // Personal Care & Services
    "Beauty": "Personal Care & Services",
    "Beauty & Personal Care": "Personal Care & Services",
    "Other Beauty & Personal Care": "Personal Care & Services",
    "Personal Care": "Personal Care & Services",

    // Home & Garden
    "Home": "Home & Garden",
    "Landscaping & Yard Services": "Home & Garden",
    "Plumbing": "Home & Garden",
    "HVAC": "Home & Garden",
    "HVAC Businesses": "Home & Garden",
    "Warm Air Heating and Air-Conditioning Equipment and Supplies Merchant Wholesalers": "Home & Garden",

    // Manufacturing, Wholesale & Distribution
    "Manufacturing": "Manufacturing, Wholesale, Distribution",
    "Wholesale": "Manufacturing, Wholesale, Distribution",
    "Wood Container and Pallet Manufacturing": "Manufacturing, Wholesale, Distribution",
    "Unlaminated Plastics Film and Sheet (except Packaging) Manufacturing": "Manufacturing, Wholesale, Distribution",
    "Switchgear and Switchboard Apparatus Manufacturing": "Manufacturing, Wholesale, Distribution",
    "Special Die and Tool, Die Set, Jig, and Fixture Manufacturing": "Manufacturing, Wholesale, Distribution",
    "Sporting and Athletic Goods Manufacturing": "Manufacturing, Wholesale, Distribution",
    "Sign Manufacturing": "Manufacturing, Wholesale, Distribution",
    
    // Merchants (Retail)
    "Retail": "Merchants (Retail)",
    "Paper & Printing": "Merchants (Retail)",
    "Signs": "Merchants (Retail)",

    // Business Support & Supplies
    "Service Businesses": "Business Support & Supplies",
    "Other Service Businesses": "Business Support & Supplies",

    // Legal & Financial
    "Finance": "Legal & Financial",
    "Accounting": "Legal & Financial",
    "Accounting & Tax Practices": "Legal & Financial",

    // Education
    "Education": "Education",

    // Real Estate
    "Real Estate": "Real Estate",
    "Property Inspectors": "Real Estate",

    // Travel & Transportation
    "Travel": "Travel & Transportation",
    "Transportation": "Travel & Transportation",
    "Specialized Freight (except Used Goods) Trucking, Local": "Travel & Transportation",

    // Amusement
    "Amusement": "Amusement",

    // Miscellaneous
    "Miscellaneous": "Miscellaneous",
    "Other - Not Listed": "Miscellaneous",
    "Architecture & Engineering Firms": "Miscellaneous",
    "Water Supply and Irrigation Systems": "Miscellaneous",
    "Business Support & Supplies": "Miscellaneous",
  };

  for (const key in categoryMappings) {
    if (industry.includes(key)) {
      return categoryMappings[key]; // Return the mapped category
    }
  }
  return "All Types"; // Default if no match
};
