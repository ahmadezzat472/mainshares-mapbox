import {
  localBusinessAirtableBaseId,
  localBusinessAirtableTableId,
  localBusinessesApiUrl,
  localBusinessesViewId,
} from "../config";
import { getCoordinates } from "./getCoordinates";
import { LocalBusiness, ResponseData } from "@/interfaces";

const MAX_RECORDS = 24;

export const getLocalBusinesses = async (
  search: string = "",
  categoriesParam: string = "",
): Promise<LocalBusiness[]> => {
  const encodedQuery = encodeURIComponent(search);
  const categories = categoriesParam.split(",").filter((i) => i.trim());

  let url = `${localBusinessesApiUrl}/${localBusinessAirtableBaseId}/${localBusinessAirtableTableId}?view=${localBusinessesViewId}&maxRecords=${MAX_RECORDS}`;

  const filterFormulas: string[] = [];
  if (search) {
    filterFormulas.push(
      `OR(FIND("${encodedQuery}", {Name}), FIND("${encodedQuery}", {CompanyAddress}))`,
    );
  }

  if (
    categories.length > 0 &&
    !categories.some((cat) => cat.toLowerCase().includes("all"))
  ) {
    const categoryFilters = categories
      .map((cat) => `FIND('${encodeURIComponent(cat)}', {Categories}) > 0`)
      .join(",");

    filterFormulas.push(`OR(${categoryFilters})`);
  }

  if (filterFormulas.length > 0) {
    const finalFormula =
      filterFormulas.length > 1
        ? `AND(${filterFormulas.join(",")})`
        : filterFormulas[0];
    url += `&filterByFormula=${finalFormula}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: ResponseData = await response.json();
  const filteredData = data.records.filter(
    (record) => record.fields.CompanyAddress,
  );

  const preparedData = await Promise.all(
    filteredData.map(async (record) => {
      const CompanyAddress = record.fields?.CompanyAddress;
      const { lat, lang } = CompanyAddress
        ? await getCoordinates(CompanyAddress)
        : { lat: 0, lang: 0 };

      return {
        id: record.id,
        name: record.fields.Name,
        industry: record.fields.Industry,
        companyAddress: CompanyAddress,
        companyPhone: record.fields.CompanyPhone,
        description: record.fields.Description,
        email: record.fields.Email,
        website: record.fields.Website,
        logo: record.fields.Logo,
        coverImage: record.fields.Logo,
        lat,
        lang,
        Categories: record.fields.Categories,
        IconsSVG: record.fields["Icons SVG (from Categories)"],
        IconsTransparent: record.fields["Icons Transparent (from Categories)"],
        IconsBackground: record.fields["Icons with Background (from Categories)"],
      };
    })
  );
  
  return preparedData;
};
