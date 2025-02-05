import { industryMapping } from "@/data";
import { IDataFilter } from "@/interfaces";

export const TransformIndustries = (industries: string[]) => {
  // Transform industries into the desired format
  const dataFilter: IDataFilter[] = [];

  // Add parent industries and their children
  for (const [parent, children] of Object.entries(industryMapping)) {
    const relatedChildren = children.filter((child) =>
      industries.includes(child)
    );
    if (relatedChildren.length > 0) {
      dataFilter.push({
        name: parent,
        children: relatedChildren.map((child) => ({ name: child })),
      });
    }
  }

  // Add remaining industries that are not part of any parent-child relationship
  const remainingIndustries = industries.filter(
    (industry) =>
      !Object.values(industryMapping).flat().includes(industry) &&
      !Object.keys(industryMapping).includes(industry)
  );

  if (remainingIndustries.length > 0) {
    dataFilter.push({
      name: "Other Industries",
      children: remainingIndustries.map((industry) => ({ name: industry })),
    });
  }

  return dataFilter;
};
