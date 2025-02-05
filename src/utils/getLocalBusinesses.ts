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
  industry: string = ""
): Promise<LocalBusiness[]> => {
  const encodedQuery = encodeURIComponent(search);
  const industries = industry.split(",").filter((i) => i.trim());

  let url = `${localBusinessesApiUrl}/${localBusinessAirtableBaseId}/${localBusinessAirtableTableId}?view=${localBusinessesViewId}&maxRecords=${MAX_RECORDS}`;

  const filterFormulas = [];
  if (search) {
    filterFormulas.push(
      `OR(FIND("${encodedQuery}", {Name}), FIND("${encodedQuery}", {CompanyAddress}))`
    );
  }
  if (industries.length > 0) {
    const industryFilters = industries
      .map((ind) => `FIND("${encodeURIComponent(ind.trim())}", {Industry})`)
      .join(",");
    filterFormulas.push(`OR(${industryFilters})`);
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
      Authorization: `Bearer ${
        import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN
      }`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: ResponseData = await response.json();
  const filteredData = data.records.filter(
    (record) => record.fields.CompanyAddress
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
      };
    })
  );

  return preparedData;
};
